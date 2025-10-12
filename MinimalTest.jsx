import React from 'react';

function MinimalTest() {
  console.log('MinimalTest 渲染開始');
  
  try {
    // 測試基本 React 組件
    return (
      <div style={{ 
        padding: '20px', 
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(135deg, #019875, #e9f7f4)',
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
          maxWidth: '600px'
        }}>
          <h1 style={{ color: '#019875', marginBottom: '20px' }}>
            🔍 組件導入測試
          </h1>
          <p style={{ fontSize: '1.2em', lineHeight: '1.6', color: '#333', marginBottom: '20px' }}>
            如果您看到這個頁面，說明基本 React 組件可以正常渲染。
          </p>
          
          <div id="import-test">
            <p>正在測試導入主組件...</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('MinimalTest 錯誤:', error);
    return (
      <div style={{ padding: '20px', background: 'red', color: 'white' }}>
        錯誤: {error.message}
      </div>
    );
  }
}

export default MinimalTest;