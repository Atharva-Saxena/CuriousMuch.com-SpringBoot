import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { questionService } from '../services/apiService';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('search');
  const category = searchParams.get('category');

  useEffect(() => {
    fetchQuestions();
  }, [currentPage, searchQuery, category]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      let response;
      if (searchQuery) {
        response = await questionService.searchQuestions(searchQuery, currentPage);
      } else if (category) {
        response = await questionService.getQuestionsByCategory(category, currentPage);
      } else {
        response = await questionService.getAllQuestions(currentPage);
      }
      
      setQuestions(response.content || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             category ? `${category} Questions` : 'All Questions'}
          </h1>
          <p className="text-gray-600 mt-1">
            {questions.length} question{questions.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Link 
          to="/ask" 
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-medium"
        >
          Ask Question
        </Link>
      </div>

      {/* Category Filter */}
      {!searchQuery && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Link 
              to="/questions" 
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                !category ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </Link>
            {['AI', 'MATH', 'BUSINESS', 'SCIENCE', 'TECHNOLOGY', 'HEALTH', 'EDUCATION', 'OTHER'].map(cat => (
              <Link 
                key={cat}
                to={`/questions?category=${cat}`}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  category === cat ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Questions List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No questions found.</p>
          <Link to="/ask" className="text-red-600 hover:text-red-700 font-medium">
            Be the first to ask a question!
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map(question => (
            <div key={question.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-red-500">
              <Link to={`/questions/${question.id}`} className="block">
                <h2 className="text-xl font-semibold text-gray-800 hover:text-red-600 mb-2">
                  {question.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{question.content}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                      {question.category}
                    </span>
                    <span>{question.viewCount || 0} views</span>
                    <span>0 answers</span>
                  </div>
                  <div className="text-right">
                    <p>Asked by <span className="font-medium">{question.user?.username}</span></p>
                    <p>{formatDate(question.createdAt)}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === index ? 'bg-red-600 text-white' : 'hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}