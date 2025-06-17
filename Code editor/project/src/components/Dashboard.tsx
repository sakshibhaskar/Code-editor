import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Clock, Target, Users, ExternalLink, Code, BookOpen, Briefcase, BarChart3, Play, Star, TrendingUp, Award, Zap, Sparkles } from 'lucide-react'

const platforms = [
  {
    name: 'Codeforces',
    url: 'https://codeforces.com',
    description: 'Competitive programming contests and practice',
    category: 'Competitive Programming',
    icon: '🏆',
    color: 'from-red-500 to-orange-500',
    difficulty: 'Advanced',
    users: '500K+'
  },
  {
    name: 'AtCoder',
    url: 'https://atcoder.jp',
    description: 'Programming contests from Japan',
    category: 'Competitive Programming',
    icon: '🎌',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Advanced',
    users: '200K+'
  },
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com',
    description: 'Global programming community',
    category: 'Competitive Programming',
    icon: '👨‍🍳',
    color: 'from-yellow-500 to-orange-500',
    difficulty: 'Intermediate',
    users: '300K+'
  },
  {
    name: 'HackerRank',
    url: 'https://www.hackerrank.com',
    description: 'Skills-based coding challenges',
    category: 'Competitive Programming',
    icon: '💻',
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Beginner',
    users: '1M+'
  },
  {
    name: 'HackerEarth',
    url: 'https://www.hackerearth.com',
    description: 'Developer assessment platform',
    category: 'Competitive Programming',
    icon: '🌍',
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Intermediate',
    users: '400K+'
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com',
    description: 'Technical interview preparation',
    category: 'Competitive Programming',
    icon: '⚡',
    color: 'from-orange-500 to-red-500',
    difficulty: 'All Levels',
    users: '2M+'
  },
  {
    name: 'SPOJ',
    url: 'https://www.spoj.com',
    description: 'Sphere Online Judge',
    category: 'Competitive Programming',
    icon: '🌐',
    color: 'from-teal-500 to-cyan-500',
    difficulty: 'Advanced',
    users: '150K+'
  },
  {
    name: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org',
    description: 'DSA and interview preparation',
    category: 'Interview Preparation',
    icon: '🧠',
    color: 'from-green-600 to-lime-500',
    difficulty: 'All Levels',
    users: '5M+'
  },
  {
    name: 'InterviewBit',
    url: 'https://www.interviewbit.com',
    description: 'Tech interview preparation',
    category: 'Interview Preparation',
    icon: '💡',
    color: 'from-blue-600 to-purple-600',
    difficulty: 'Intermediate',
    users: '800K+'
  },
  {
    name: 'AlgoExpert',
    url: 'https://www.algoexpert.io',
    description: 'Algorithm and system design prep',
    category: 'Interview Preparation',
    icon: '🎯',
    color: 'from-indigo-500 to-blue-500',
    difficulty: 'Advanced',
    users: '100K+'
  },
  {
    name: 'Exercism',
    url: 'https://exercism.org',
    description: 'Learn through practice and mentorship',
    category: 'Interview Preparation',
    icon: '📚',
    color: 'from-purple-600 to-pink-600',
    difficulty: 'Beginner',
    users: '300K+'
  },
  {
    name: 'Turing',
    url: 'https://www.turing.com',
    description: 'Remote job opportunities',
    category: 'Job-Oriented',
    icon: '💼',
    color: 'from-gray-600 to-gray-800',
    difficulty: 'Professional',
    users: '50K+'
  },
  {
    name: 'TopCoder',
    url: 'https://www.topcoder.com',
    description: 'Crowdsourcing marketplace',
    category: 'Job-Oriented',
    icon: '🏅',
    color: 'from-yellow-600 to-orange-600',
    difficulty: 'Advanced',
    users: '200K+'
  },
  {
    name: 'Codility',
    url: 'https://www.codility.com',
    description: 'Technical recruitment platform',
    category: 'Job-Oriented',
    icon: '🔍',
    color: 'from-blue-500 to-teal-500',
    difficulty: 'Professional',
    users: '100K+'
  },
  {
    name: 'DevSkiller',
    url: 'https://devskiller.com',
    description: 'Technical screening platform',
    category: 'Job-Oriented',
    icon: '⚙️',
    color: 'from-red-600 to-pink-600',
    difficulty: 'Professional',
    users: '75K+'
  },
  {
    name: 'Kaggle',
    url: 'https://www.kaggle.com',
    description: 'Data science competitions',
    category: 'Data Science',
    icon: '📊',
    color: 'from-cyan-500 to-blue-600',
    difficulty: 'All Levels',
    users: '1M+'
  },
  {
    name: 'DataCamp',
    url: 'https://www.datacamp.com',
    description: 'Data science learning platform',
    category: 'Data Science',
    icon: '📈',
    color: 'from-green-500 to-teal-600',
    difficulty: 'Beginner',
    users: '500K+'
  }
]

const categories = [
  { name: 'Competitive Programming', icon: Trophy, color: 'text-yellow-400', bgColor: 'from-yellow-500/20 to-orange-500/20' },
  { name: 'Interview Preparation', icon: BookOpen, color: 'text-blue-400', bgColor: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'Job-Oriented', icon: Briefcase, color: 'text-green-400', bgColor: 'from-green-500/20 to-emerald-500/20' },
  { name: 'Data Science', icon: BarChart3, color: 'text-purple-400', bgColor: 'from-purple-500/20 to-pink-500/20' }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'text-green-400 bg-green-500/20'
    case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20'
    case 'Advanced': return 'text-red-400 bg-red-500/20'
    case 'Professional': return 'text-purple-400 bg-purple-500/20'
    case 'All Levels': return 'text-blue-400 bg-blue-500/20'
    default: return 'text-gray-400 bg-gray-500/20'
  }
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handlePlatformClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleStartCoding = () => {
    navigate('/editor')
  }

  const filteredPlatforms = selectedCategory 
    ? platforms.filter(p => p.category === selectedCategory)
    : platforms

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative z-10 p-8">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <Sparkles className="h-12 w-12 text-yellow-400 animate-pulse" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeArena
              </h1>
              <Zap className="h-12 w-12 text-indigo-400 animate-bounce" />
            </div>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Master the art of programming with access to the world's premier coding platforms. 
              <span className="text-indigo-400 font-semibold"> Practice, compete, and excel</span> in your coding journey.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleStartCoding}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Start Coding Now</span>
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Explore Platforms</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/30 rounded-xl">
                <Target className="h-8 w-8 text-blue-400" />
              </div>
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Problems Solved</p>
              <p className="text-3xl font-bold text-white mb-1">0</p>
              <p className="text-green-400 text-sm">+0 this week</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/30 rounded-xl">
                <Trophy className="h-8 w-8 text-green-400" />
              </div>
              <Award className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Contests Won</p>
              <p className="text-3xl font-bold text-white mb-1">0</p>
              <p className="text-yellow-400 text-sm">Ready to compete</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/30 rounded-xl">
                <Clock className="h-8 w-8 text-purple-400" />
              </div>
              <Zap className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Hours Coded</p>
              <p className="text-3xl font-bold text-white mb-1">0</p>
              <p className="text-indigo-400 text-sm">Start your journey</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/30 rounded-xl">
                <Users className="h-8 w-8 text-orange-400" />
              </div>
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Global Rank</p>
              <p className="text-3xl font-bold text-white mb-1">-</p>
              <p className="text-yellow-400 text-sm">Climb the ladder</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            All Platforms
          </button>
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.name
                    ? `bg-gradient-to-r ${category.bgColor} text-white shadow-lg border border-white/30`
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Icon className={`h-5 w-5 ${selectedCategory === category.name ? 'text-white' : category.color}`} />
                <span>{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* Platforms Grid */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryPlatforms = filteredPlatforms.filter(p => p.category === category.name)
            if (categoryPlatforms.length === 0) return null
            
            const Icon = category.icon
            
            return (
              <div key={category.name} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 bg-gradient-to-r ${category.bgColor} rounded-xl`}>
                    <Icon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{category.name}</h2>
                    <p className="text-gray-400">
                      {categoryPlatforms.length} platform{categoryPlatforms.length !== 1 ? 's' : ''} available
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryPlatforms.map((platform) => (
                    <div
                      key={platform.name}
                      onClick={() => handlePlatformClick(platform.url)}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`text-4xl p-4 rounded-xl bg-gradient-to-r ${platform.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                            {platform.icon}
                          </div>
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(platform.difficulty)}`}>
                              {platform.difficulty}
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                          {platform.name}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-4 leading-relaxed">
                          {platform.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">{platform.users} users</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-white/20">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Coding Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of developers worldwide and take your programming skills to the next level
          </p>
          <button
            onClick={handleStartCoding}
            className="px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 mx-auto"
          >
            <Code className="h-6 w-6" />
            <span>Open Code Editor</span>
            <Sparkles className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}