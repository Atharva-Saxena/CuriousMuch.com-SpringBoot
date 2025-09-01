import React, { useState } from 'react';
import api from '../services/api';

export default function ApiTest() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    try {
      const response = await api.get('/questions');
      setResult('SUCCESS: ' + JSON.stringify(response.data).substring(0, 200) + '...');
    } catch (error) {
      setResult('ERROR: ' + error.message + ' | ' + (error.response?.status || 'No response'));
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
      <h3 className="font-bold mb-2">API Connection Test</h3>
      <button 
        onClick={testApi} 
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>
      {result && (
        <div className="mt-2 p-2 bg-white rounded text-sm">
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}