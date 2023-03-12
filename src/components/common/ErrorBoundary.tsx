import { Component, PropsWithChildren } from 'react';
import { ErrorBoundaryScreen } from '../../screens/InfoScreen';

class ErrorBoundary extends Component<PropsWithChildren> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <ErrorBoundaryScreen />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
