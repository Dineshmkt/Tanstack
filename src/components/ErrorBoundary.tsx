import { Component, type ErrorInfo, type ReactNode } from 'react';

type Prop = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Prop, State> {
  constructor(props: Prop) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Caught error:", error);
    console.error("Error info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
