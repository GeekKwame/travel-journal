import { OAuthProvider, Query } from "appwrite";
import { account, databases, appwriteConfig } from "./client";
import { redirect } from "react-router";

export const loginWithGoogle = async () => {
    try {
        await account.createOAuth2Session(
            OAuthProvider.Google,
            `${window.location.origin}/`,
            `${window.location.origin}/sign-in`
        )
    } catch (e) {
        console.error('loginWithGoogle', e);
    }
}

export const getUser = async () => {
    try {
        const user = await account.get();

        if (!user) return redirect('/sign-in');

        const { documents } = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [
                Query.equal('accountId', user.$id),
                Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId'])
            ]
        );

        return documents[0]; // Return the user document
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const getGooglePicture = async () => {
    try {
        const session = await account.getSession('current');
        // 'providerAccessToken' is available in the session object if the session was created via OAuth
        const accessToken = session.providerAccessToken;

        if (!accessToken) {
            console.error("No provider access token found.");
            return null;
        }

        const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=photos', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            console.error("Failed to fetch Google profile picture");
            return null;
        }

        const data = await response.json();
        // Google People API returns 'photos' array. We take the first one.
        // Format: { photos: [ { url: '...' } ] }
        // Actually it's 'photos': [ { 'url': '...' } ] or 'photos': [ { 'url': '...' } ]
        // Let's check the structure: { resourceName: string, etag: string, photos: [ { metadata: ..., url: string } ] }
        return data.photos && data.photos.length > 0 ? data.photos[0].url : null;

    } catch (e) {
        console.error(e);
        return null;
    }
}
export const getExistingUser = async () => {
    try {
        const user = await account.get();
        if (!user) return null;

        const { documents } = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [
                Query.equal('accountId', user.$id)
            ]
        );

        return documents.length > 0 ? documents[0] : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}
export const storeUserData = async () => {
    try {
        const existingUser = await getExistingUser();
        if (existingUser) return existingUser;

        const user = await account.get();
        const avatarUrl = await getGooglePicture();

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            'unique()', // Document ID
            {
                accountId: user.$id,
                name: user.name,
                email: user.email,
                imageUrl: avatarUrl,
                joinedAt: new Date().toISOString()
            }
        );

        return newUser;
    } catch (e) {
        console.error(e);
        return null;
    }
}




export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

