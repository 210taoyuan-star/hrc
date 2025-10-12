import React from 'react';

function TestComponent() {
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
          🤱 祈孕顧問 - React 測試
        </h1>
        <p style={{ fontSize: '1.2em', lineHeight: '1.6', color: '#333' }}>
          這是一個簡化的 React 組件測試。如果您看到這個頁面，說明 React 和 Vite 運行正常。
        </p>
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#e9f7f4',
          borderRadius: '10px',
          borderLeft: '4px solid #019875'
        }}>
          <strong>React 狀態：</strong> 正常運行 ✅<br/>
          <strong>時間：</strong> {new Date().toLocaleString('zh-TW')}<br/>
          <strong>組件：</strong> TestComponent
        </div>
      </div>
    </div>
  );
}

export default TestComponent;