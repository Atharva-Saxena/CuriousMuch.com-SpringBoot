import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useApi';
import { questionService } from '../services/apiService';
import ApiTest from '../components/ApiTest';

export default function HomePage() {
  const { data: questions, loading, error } = useFetch(() => questionService.getAllQuestions(0, 5));

  return (
    <div className="max-w-6xl mx-auto">
      <ApiTest />
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-red-50 to-white rounded-lg mb-8">
        <h1 className="text-5xl font-bold text-red-600 mb-4">Welcome to CuriousMuch.com!</h1>
        <p className="text-xl text-gray-700 mb-6">Ask questions, share knowledge, and learn together</p>
        <Link 
          to="/ask" 
          className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Ask Your First Question
        </Link>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['AI', 'MATH', 'BUSINESS', 'SCIENCE', 'TECHNOLOGY', 'HEALTH', 'EDUCATION', 'OTHER'].map(category => (
            <Link 
              key={category}
              to={`/questions?category=${category}`}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-red-500"
            >
              <h3 className="font-semibold text-gray-800">{category}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Questions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Recent Questions</h2>
          <Link to="/questions" className="text-red-600 hover:text-red-700 font-medium">
            View All Questions →
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <p>Error: {error}</p>
            <p className="text-sm text-gray-500 mt-2">Check if backend is running on port 8082</p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions?.content?.map(question => (
              <div key={question.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <Link to={`/questions/${question.id}`} className="block">
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-red-600 mb-2">
                    {question.title}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{question.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                      {question.category}
                    </span>
                    <span>Asked by {question.user?.username}</span>
                  </div>
                </Link>
              </div>
            )) || (
              <div className="text-center py-8 text-gray-500">
                No questions yet. Be the first to ask!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
