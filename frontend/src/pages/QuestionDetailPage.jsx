import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questionService, answerService } from '../services/apiService';
import { useAuth } from '../hooks/useApi';

export default function QuestionDetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [id]);

  const fetchQuestionAndAnswers = async () => {
    try {
      const [questionData, answersData] = await Promise.all([
        questionService.getQuestionById(id),
        answerService.getAnswersByQuestionId(id)
      ]);
      setQuestion(questionData);
      setAnswers(answersData);
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    setSubmitting(true);
    try {
      await answerService.createAnswer(id, { content: newAnswer });
      setNewAnswer('');
      fetchQuestionAndAnswers();
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (answerId, voteType) => {
    try {
      await answerService.voteOnAnswer(answerId, { voteType });
      fetchQuestionAndAnswers();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleMarkBestAnswer = async (answerId) => {
    try {
      await answerService.markAsBestAnswer(answerId);
      fetchQuestionAndAnswers();
    } catch (error) {
      console.error('Error marking best answer:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Question not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-start justify-between mb-4">
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            {question.category}
          </span>
          <span className="text-gray-500 text-sm">{question.viewCount} views</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{question.title}</h1>
        
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-wrap">{question.content}</p>
          {question.imageUrl && (
            <img 
              src={question.imageUrl} 
              alt="Question image" 
              className="mt-4 max-w-full h-auto rounded-lg"
            />
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
          <span>Asked by <span className="font-medium">{question.user?.username}</span></span>
          <span>{new Date(question.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {answers.length} Answer{answers.length !== 1 ? 's' : ''}
        </h2>
        
        {answers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No answers yet. Be the first to answer!
          </div>
        ) : (
          <div className="space-y-4">
            {answers.map(answer => (
              <div 
                key={answer.id} 
                className={`bg-white p-6 rounded-lg shadow ${
                  answer.isBestAnswer ? 'border-l-4 border-green-500 bg-green-50' : ''
                }`}
              >
                {answer.isBestAnswer && (
                  <div className="mb-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      ✓ Best Answer
                    </span>
                  </div>
                )}
                
                <div className="prose max-w-none mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{answer.content}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {isAuthenticated && user?.id !== answer.user?.id && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleVote(answer.id, 'UPVOTE')}
                          className="text-gray-500 hover:text-green-600"
                        >
                          ↑ {answer.upvotes}
                        </button>
                        <button
                          onClick={() => handleVote(answer.id, 'DOWNVOTE')}
                          className="text-gray-500 hover:text-red-600"
                        >
                          ↓ {answer.downvotes}
                        </button>
                      </div>
                    )}
                    
                    {isAuthenticated && 
                     user?.id === question.user?.id && 
                     !answer.isBestAnswer && (
                      <button
                        onClick={() => handleMarkBestAnswer(answer.id)}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Mark as Best Answer
                      </button>
                    )}
                  </div>
                  
                  <div className="text-right text-sm text-gray-500">
                    <p>Answered by <span className="font-medium">{answer.user?.username}</span></p>
                    <p>{new Date(answer.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Answer</h3>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Write your answer here..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              required
            />
            <button
              type="submit"
              disabled={submitting || !newAnswer.trim()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium"
            >
              {submitting ? 'Submitting...' : 'Post Answer'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-600 mb-4">Please login to answer this question.</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}