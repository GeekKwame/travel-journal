import { type RouteConfig, layout, route, index } from "@react-router/dev/routes";

export default [
    route("sign-in", "routes/root/sign-in.tsx"),
    route("api/create-trip", "routes/api/create-trip.ts"),

    layout("routes/admin/admin-layout.tsx", [
        route("admin", "routes/admin/dashboard.tsx", { id: "admin-index" }),
        route("dashboard", "routes/admin/dashboard.tsx", { id: "admin-dashboard" }),
        route("all-users", "routes/admin/all-users.tsx"),
        route("trips", "routes/admin/trips.tsx"),
        route("create-trip", "routes/admin/create-trip.tsx", { id: "admin-create-trip" }),
        route("trip/:id", "routes/admin/trip-details.tsx"),
    ]),

    layout("routes/root/page-layout.tsx", [
        index("routes/root/travel-page.tsx"),
        route("my-trips", "routes/root/my-trips.tsx"),
        route("create-trip", "routes/admin/create-trip.tsx", { id: "root-create-trip" }),
        route("travel/:tripId/success", "routes/root/payment-success.tsx"),
        route("travel/:tripId", "routes/root/travel-detail.tsx"),
    ])
] satisfies RouteConfig;
