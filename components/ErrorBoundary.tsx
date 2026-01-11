import { Component, type ReactNode } from 'react';
import { Link } from 'react-router';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
                    <div className="max-w-md w-full glass p-8 rounded-3xl text-center space-y-6">
                        <div className="size-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                            <svg className="size-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
                            <p className="text-slate-600">
                                We encountered an unexpected error. Please try refreshing the page.
                            </p>
                        </div>

                        {this.state.error && (
                            <details className="text-left">
                                <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-700">
                                    Error details
                                </summary>
                                <pre className="mt-2 text-xs bg-slate-100 p-3 rounded-lg overflow-auto max-h-40">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}

                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors"
                            >
                                Refresh Page
                            </button>
                            <Link
                                to="/"
                                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-colors"
                            >
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
