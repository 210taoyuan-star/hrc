import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          background: 'linear-gradient(135deg, #ff6b6b, #ffeaa7)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center',
            maxWidth: '800px'
          }}>
            <h1 style={{ color: '#d63031', marginBottom: '20px' }}>
              ⚠️ React 組件錯誤
            </h1>
            <p style={{ fontSize: '1.2em', lineHeight: '1.6', color: '#333', marginBottom: '30px' }}>
              組件渲染時發生錯誤，以下是詳細信息：
            </p>
            
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'left',
              borderLeft: '4px solid #d63031'
            }}>
              <h3 style={{ color: '#d63031', marginBottom: '10px' }}>錯誤訊息:</h3>
              <pre style={{ 
                fontSize: '14px', 
                fontFamily: 'monospace', 
                background: '#fff', 
                padding: '10px', 
                borderRadius: '5px',
                overflow: 'auto',
                whiteSpace: 'pre-wrap'
              }}>
                {this.state.error && this.state.error.toString()}
              </pre>
            </div>

            {this.state.errorInfo && (
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px',
                textAlign: 'left',
                borderLeft: '4px solid #d63031'
              }}>
                <h3 style={{ color: '#d63031', marginBottom: '10px' }}>組件堆疊:</h3>
                <pre style={{ 
                  fontSize: '12px', 
                  fontFamily: 'monospace', 
                  background: '#fff', 
                  padding: '10px', 
                  borderRadius: '5px',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '200px'
                }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#019875',
                color: 'white',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1em',
                cursor: 'pointer'
              }}
            >
              重新載入頁面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;