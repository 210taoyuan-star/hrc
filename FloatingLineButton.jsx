// FloatingLineButton.jsx - 符合 React/Vite 架構的浮動 LINE 按鈕

import React from 'react';

export default function FloatingLineButton() {
  return (
    <a
      href="https://line.me/R/ti/p/@293mminh"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
      aria-label="LINE 諮詢"
    >
      {/* LINE 圖標 SVG */}
      <svg 
        className="w-9 h-9 group-hover:scale-110 transition-transform duration-300" 
        viewBox="0 0 512 512" 
        fill="currentColor"
      >
        <path d="M443 233.8c0-84.6-84.6-153.3-188.6-153.3S65.8 149.2 65.8 233.8c0 75.9 67.2 139.4 158.1 151.4 6.2 1.3 14.6 4.1 16.7 9.4 1.9 4.7 1.2 12.1 0.6 16.9 0 0-2.2 13.4-2.7 16.2-0.8 4.9-3.8 19.3 16.9 10.5s112.3-66 153.3-113C424.5 306.6 443 272.1 443 233.8zM203.6 281.1h-49.4c-5.4 0-9.8-4.4-9.8-9.8V190.7c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8v70.8h39.6c5.4 0 9.8 4.4 9.8 9.8S209 281.1 203.6 281.1zM254.3 271.3c0 5.4-4.4 9.8-9.8 9.8s-9.8-4.4-9.8-9.8V190.7c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8V271.3zM327.7 271.3c0 4.6-3.2 8.5-7.5 9.5-1 0.2-2 0.3-3 0.3-3.6 0-6.9-2-8.5-5.2l-27.4-54.1v49.5c0 5.4-4.4 9.8-9.8 9.8s-9.8-4.4-9.8-9.8V190.7c0-4.6 3.2-8.5 7.5-9.5 1-0.2 2-0.3 3-0.3 3.6 0 6.9 2 8.5 5.2l27.4 54.1v-49.5c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8V271.3zM408.9 220.3c5.4 0 9.8 4.4 9.8 9.8s-4.4 9.8-9.8 9.8h-29.8v21.6h29.8c5.4 0 9.8 4.4 9.8 9.8s-4.4 9.8-9.8 9.8h-39.6c-5.4 0-9.8-4.4-9.8-9.8V190.7c0-5.4 4.4-9.8 9.8-9.8h39.6c5.4 0 9.8 4.4 9.8 9.8s-4.4 9.8-9.8 9.8h-29.8v19.8H408.9z"/>
      </svg>
      
      {/* 小提示氣泡 (可選) */}
      <div className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        LINE 諮詢
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
      </div>
    </a>
  );
}