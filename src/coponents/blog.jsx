import React, { useState, useEffect } from 'react';

const BlogWritingPage = () => {
  // State for managing blogs
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('blogs');
    return saved ? JSON.parse(saved) : [];
  });
  
  // State for displaying blog list
  const [showBlogList, setShowBlogList] = useState(false);

  // Other states
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('blogActiveTab');
    return saved ? JSON.parse(saved) : 'blog';
  });

  const [selectedTags, setSelectedTags] = useState(() => {
    const saved = localStorage.getItem('blogSelectedTags');
    return saved ? JSON.parse(saved) : [];
  });

  const [attractions, setAttractions] = useState(() => {
    const saved = localStorage.getItem('blogAttractions');
    return saved ? JSON.parse(saved) : [{ id: 1, title: '', description: '' }];
  });

  const [foodPlaces, setFoodPlaces] = useState(() => {
    const saved = localStorage.getItem('blogFoodPlaces');
    return saved ? JSON.parse(saved) : [{ id: 1, name: '', description: '' }];
  });

  const [blogData, setBlogData] = useState(() => {
    const saved = localStorage.getItem('blogMainData');
    return saved ? JSON.parse(saved) : {
      destinationName: '',
      languages: '',
      tripCost: '',
      description: '',
      travelTips: ''
    };
  });

  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [publishStatus, setPublishStatus] = useState(''); // 'success', 'error', or ''

  // Tags remain static
  const tags = [
    { id: 1, name: 'Summer', color: 'bg-yellow-500' },
    { id: 2, name: 'Family', color: 'bg-blue-500' },
    { id: 3, name: 'Friends', color: 'bg-green-500' },
    { id: 4, name: 'Trekking', color: 'bg-red-500' },
    { id: 5, name: 'Beach', color: 'bg-cyan-500' },
    { id: 6, name: 'Mountains', color: 'bg-amber-700' },
    { id: 7, name: 'Budget', color: 'bg-purple-500' },
    { id: 8, name: 'Luxury', color: 'bg-pink-500' },
    { id: 9, name: 'Adventure', color: 'bg-orange-500' },
    { id: 10, name: 'Cultural', color: 'bg-indigo-500' },
  ];

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
    localStorage.setItem('blogActiveTab', JSON.stringify(activeTab));
    localStorage.setItem('blogSelectedTags', JSON.stringify(selectedTags));
    localStorage.setItem('blogAttractions', JSON.stringify(attractions));
    localStorage.setItem('blogFoodPlaces', JSON.stringify(foodPlaces));
    localStorage.setItem('blogMainData', JSON.stringify(blogData));
  }, [blogs, activeTab, selectedTags, attractions, foodPlaces, blogData]);

  // Reset notification states after a delay
  useEffect(() => {
    if (isDraftSaved || publishStatus) {
      const timer = setTimeout(() => {
        setIsDraftSaved(false);
        setPublishStatus('');
        // Show the blog list when a blog is saved or published
        setShowBlogList(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isDraftSaved, publishStatus]);

  // Handle input changes for main blog data
  const handleBlogDataChange = (field, value) => {
    setBlogData({
      ...blogData,
      [field]: value
    });
  };

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const addAttraction = () => {
    const newId = attractions.length > 0 ? Math.max(...attractions.map(a => a.id)) + 1 : 1;
    setAttractions([...attractions, { id: newId, title: '', description: '' }]);
  };

  const updateAttraction = (id, field, value) => {
    setAttractions(attractions.map(attraction => 
      attraction.id === id ? { ...attraction, [field]: value } : attraction
    ));
  };

  const addFoodPlace = () => {
    const newId = foodPlaces.length > 0 ? Math.max(...foodPlaces.map(p => p.id)) + 1 : 1;
    setFoodPlaces([...foodPlaces, { id: newId, name: '', description: '' }]);
  };

  const updateFoodPlace = (id, field, value) => {
    setFoodPlaces(foodPlaces.map(place => 
      place.id === id ? { ...place, [field]: value } : place
    ));
  };

  // Clear all saved data
  const clearSavedData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setActiveTab('blog');
      setSelectedTags([]);
      setAttractions([{ id: 1, title: '', description: '' }]);
      setFoodPlaces([{ id: 1, name: '', description: '' }]);
      setBlogData({
        destinationName: '',
        languages: '',
        tripCost: '',
        description: '',
        travelTips: ''
      });

      // Clear localStorage
      localStorage.removeItem('blogActiveTab');
      localStorage.removeItem('blogSelectedTags');
      localStorage.removeItem('blogAttractions');
      localStorage.removeItem('blogFoodPlaces');
      localStorage.removeItem('blogMainData');
    }
  };

  // Preview blog function
  const previewBlog = () => {
    setIsPreviewMode(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
  };

  // Close preview function
  const closePreview = () => {
    setIsPreviewMode(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Save as draft function
  const saveAsDraft = () => {
    const newBlog = {
      id: Date.now(), // Unique ID based on timestamp
      createdAt: new Date().toISOString(),
      ...blogData,
      tags: selectedTags.map(id => tags.find(tag => tag.id === id)?.name),
      attractions: attractions.filter(a => a.title || a.description),
      foodPlaces: foodPlaces.filter(p => p.name || p.description),
      status: 'draft',
    };

    setBlogs([...blogs, newBlog]);
    setIsDraftSaved(true);
    setShowBlogList(true); // Show blog list after saving
  };

  // Publish blog function
  const publishBlog = () => {
    // Form validation
    if (!blogData.destinationName || !blogData.description) {
      alert('Please fill in at least the destination name and description before publishing.');
      return;
    }

    const newBlog = {
      id: Date.now(), // Unique ID based on timestamp
      createdAt: new Date().toISOString(),
      ...blogData,
      tags: selectedTags.map(id => tags.find(tag => tag.id === id)?.name),
      attractions: attractions.filter(a => a.title || a.description),
      foodPlaces: foodPlaces.filter(p => p.name || p.description),
      status: 'published',
    };

    setPublishStatus('loading');

    // Simulate server request
    setTimeout(() => {
      setBlogs([...blogs, newBlog]);
      setPublishStatus('success');
      setShowBlogList(true); // Show blog list after publishing
    }, 1500);
  };

  // Delete blog function
  const deleteBlog = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    }
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="h-screen overflow-auto bg-gray-100">
      <div className="flex flex-col min-h-screen">
        {/* Top Content Area */}
        <div className="flex flex-1">
          {/* Left content area - 70% */}
          <div className="w-[70%] flex flex-col">
            {/* Title section */}
            <div className="px-4 pt-3 md:px-5 md:pt-4 pb-3">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h1 className="text-2xl font-bold text-gray-800 mb-1 text-left">Create Your Travel Blog</h1>
                  <p className="text-sm text-gray-600 text-left">
                    Share your travel experiences with the world. Document your journey, highlight attractions, 
                    share food recommendations, and help others plan their perfect trip.
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs container */}
            <div className="flex-1 px-4 pb-3 md:px-5 md:pb-4 flex flex-col min-h-0">
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md flex flex-col h-full">
                {/* Tabs navigation */}
                <div className="border-b border-gray-200 flex-shrink-0">
                  <nav className="flex overflow-x-auto">
                    {['blog', 'attractions', 'food', 'travel tips', 'photos'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
                          activeTab === tab 
                            ? 'border-b-2 border-blue-500 text-blue-600' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>
                
                {/* Tab content - Add your tab content here */}
                <div className="p-4 overflow-y-auto flex-1">
                  {/* Your tab content here */}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right fixed sidebar - 30% */}
          <div className="w-[30%] bg-gray-100 p-3 md:p-4 overflow-y-auto fixed right-0 h-screen">
            <div className="space-y-4">
              {/* Tags selection card */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 text-left">Destination Themes</h3>
                <p className="text-sm text-gray-600 mb-3 text-left">
                  Select tags that best describe your destination and travel experience.
                </p>
                
                <div className="space-y-1.5">
                  {tags.map(tag => (
                    <div key={tag.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`tag-${tag.id}`} // Fixed template literal syntax
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => toggleTag(tag.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label 
                        htmlFor={`tag-${tag.id}`} // Fixed template literal syntax
                        className="ml-2 text-sm text-gray-700"
                      >
                        {tag.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Review and post card */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 text-left">Ready to Share?</h3>
                <p className="text-sm text-gray-600 mb-4 text-left">
                  Review your blog before publishing. Make sure all sections are complete and photos are uploaded.
                </p>
                
                <div className="space-y-2.5">
                  <button 
                    onClick={previewBlog}
                    className="w-full py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Preview Blog
                  </button>
                  <button 
                    onClick={publishBlog}
                    className={`w-full py-2.5 font-medium rounded-lg transition-colors flex items-center justify-center
                      ${publishStatus === 'loading' ? 'bg-green-500 text-white cursor-wait' : 'bg-green-600 text-white hover:bg-green-700'}`}
                    disabled={publishStatus === 'loading'}
                  >
                    {publishStatus === 'loading' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3V4"></path>
                        </svg>
                        Publish Blog
                      </>
                    )}
                  </button>
                  <button 
                    onClick={saveAsDraft}
                    className="w-full py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                    </svg>
                    Save as Draft
                  </button>
                  
                  <button 
                    onClick={() => setShowBlogList(!showBlogList)}
                    className="w-full py-2.5 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    {showBlogList ? 'Hide My Blogs' : 'Show My Blogs'}
                  </button>
                  
                  <button 
                    onClick={clearSavedData}
                    className="w-full py-2.5 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Clear Form Data
                  </button>
                </div>
                
                {/* Status notifications */}
                {isDraftSaved && (
                  <div className="mt-3 py-2 px-3 bg-blue-50 text-blue-800 text-sm rounded-md flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Draft saved successfully
                  </div>
                )}
                
                {publishStatus === 'success' && (
                  <div className="mt-3 py-2 px-3 bg-green-50 text-green-800 text-sm rounded-md flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Blog published successfully
                  </div>
                )}
                
                {publishStatus === 'error' && (
                  <div className="mt-3 py-2 px-3 bg-red-50 text-red-800 text-sm rounded-md flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Error publishing blog. Please try again.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Blog List Section - Displayed at the bottom */}
        {showBlogList && (
          <div className="w-full bg-white shadow-md mt-4 mb-8 mx-auto max-w-7xl rounded-xl">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">My Blogs</h2>
              <p className="text-gray-600">View, edit or manage your saved blogs</p>
            </div>
            
            {blogs.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No blogs yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new blog post. Save as draft or publish directly.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {blogs.map(blog => (
                  <div key={blog.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{blog.destinationName || "Untitled Blog"}</h3>
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                            blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {blog.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {truncateText(blog.description, 150) || "No description provided."}
                        </p>
                        
                        {/* Blog tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {blog.tags.map((tag, idx) => (
                              <span key={idx} className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="text-xs text-gray-500">
                          Created: {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {/* View button */}
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                        
                        {/* Edit button */}
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        
                        {/* Delete button */}
                        <button 
                          onClick={() => deleteBlog(blog.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {isPreviewMode && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Blog Preview</h2>
              <button 
                onClick={closePreview}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {/* Preview Content */}
              <div className="prose max-w-none">
                <h1>{blogData.destinationName || "Untitled Destination"}</h1>
                {/* ... other preview content ... */}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={closePreview}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogWritingPage;