import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#000000] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#087BC1]/20 border border-[#087BC1]/40 flex items-center justify-center text-[#65D5FF] mb-4">
            <span className="text-2xl font-bold">!</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Jacobs Elétrica e Hidráulica</h2>
          <p className="text-sm text-[#B8C1CC] max-w-md mb-6">
            Ocorreu uma instabilidade temporária ao carregar a interface.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-lg bg-[#087BC1] hover:bg-[#0a8fdc] text-white text-sm font-semibold transition-all cursor-pointer shadow-[0_4px_14px_rgba(8,123,193,0.3)]"
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
