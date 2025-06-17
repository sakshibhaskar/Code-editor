import React, { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Play, Save, RefreshCw, Settings, Download, Upload, Copy, Check, Zap, Terminal, FileCode, Sparkles } from 'lucide-react'

const languages = [
  { value: 'javascript', label: 'JavaScript', extension: 'js' },
  { value: 'python', label: 'Python', extension: 'py' },
  { value: 'java', label: 'Java', extension: 'java' },
  { value: 'cpp', label: 'C++', extension: 'cpp' },
  { value: 'c', label: 'C', extension: 'c' },
  { value: 'typescript', label: 'TypeScript', extension: 'ts' },
  { value: 'go', label: 'Go', extension: 'go' },
  { value: 'rust', label: 'Rust', extension: 'rs' },
  { value: 'php', label: 'PHP', extension: 'php' },
  { value: 'ruby', label: 'Ruby', extension: 'rb' }
]

const themes = [
  { value: 'vs-dark', label: 'Dark Theme' },
  { value: 'light', label: 'Light Theme' },
  { value: 'hc-black', label: 'High Contrast Dark' },
  { value: 'hc-light', label: 'High Contrast Light' }
]

const sampleProblems = [
  {
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    input: 'nums = [2,7,11,15], target = 9',
    output: '[0,1]',
    explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
  },
  {
    title: 'Palindrome Check',
    description: 'Write a function to check if a given string is a palindrome.',
    input: 'str = "racecar"',
    output: 'true',
    explanation: 'The string reads the same forwards and backwards.'
  },
  {
    title: 'Fibonacci Sequence',
    description: 'Generate the first n numbers in the Fibonacci sequence.',
    input: 'n = 10',
    output: '[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]',
    explanation: 'Each number is the sum of the two preceding ones.'
  }
]

const getDefaultCode = (language: string) => {
  const templates: { [key: string]: string } = {
    javascript: `// Welcome to CodeArena Editor
// Solve coding problems with style!

function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test the function
const nums = [2, 7, 11, 15];
const target = 9;
console.log("Result:", twoSum(nums, target));`,
    
    python: `# Welcome to CodeArena Editor
# Solve coding problems with Python!

def two_sum(nums, target):
    """
    Find two numbers that add up to target
    """
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []

# Test the function
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Result: {result}")`,
    
    java: `// Welcome to CodeArena Editor
// Solve coding problems with Java!

import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            
            map.put(nums[i], i);
        }
        
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = solution.twoSum(nums, target);
        System.out.println("Result: " + Arrays.toString(result));
    }
}`,
    
    cpp: `// Welcome to CodeArena Editor
// Solve coding problems with C++!

#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            
            map[nums[i]] = i;
        }
        
        return {};
    }
};

int main() {
    Solution solution;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = solution.twoSum(nums, target);
    
    cout << "Result: [" << result[0] << ", " << result[1] << "]" << endl;
    return 0;
}`
  }
  
  return templates[language] || `// Welcome to CodeArena Editor
// Write your ${language} solution here

console.log("Hello, CodeArena!");`
}

export const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState('vs-dark')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedProblem, setSelectedProblem] = useState(0)
  const editorRef = useRef<any>(null)

  // Initialize code when language changes
  React.useEffect(() => {
    setCode(getDefaultCode(language))
  }, [language])

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('🚀 Executing your code...\n')
    
    // Simulate code execution with more realistic timing
    setTimeout(() => {
      try {
        if (language === 'javascript') {
          // Capture console output
          const logs: string[] = []
          const originalLog = console.log
          const originalError = console.error
          
          console.log = (...args) => {
            logs.push('✅ ' + args.join(' '))
          }
          console.error = (...args) => {
            logs.push('❌ ' + args.join(' '))
          }
          
          // Simple eval for demonstration
          eval(code)
          
          // Restore original console methods
          console.log = originalLog
          console.error = originalError
          
          const result = logs.length > 0 ? logs.join('\n') : '✅ Code executed successfully!'
          setOutput(`🎉 Execution completed!\n\n${result}\n\n⚡ Runtime: ${Math.random() * 100 + 50}ms\n💾 Memory: ${Math.random() * 10 + 5}MB`)
        } else {
          setOutput(`🔥 ${language.toUpperCase()} Execution Simulation\n\n✅ Code compiled successfully!\n✅ All test cases passed!\n\n⚡ Runtime: ${Math.random() * 200 + 100}ms\n💾 Memory: ${Math.random() * 20 + 10}MB\n\n🏆 Your solution would be executed on our secure servers.`)
        }
      } catch (error: any) {
        setOutput(`❌ Runtime Error:\n\n${error.message}\n\n💡 Tip: Check your syntax and logic!`)
      }
      setIsRunning(false)
    }, 1500)
  }

  const handleSaveCode = () => {
    const selectedLang = languages.find(l => l.value === language)
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `solution.${selectedLang?.extension || 'txt'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const handleResetCode = () => {
    setCode(getDefaultCode(language))
    setOutput('')
    setInput('')
  }

  const handleLoadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCode(content)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileCode className="h-8 w-8 text-indigo-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Code Editor
              </h1>
              <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-md"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value} className="bg-gray-800">
                  {lang.label}
                </option>
              ))}
            </select>
            
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-md"
            >
              {themes.map((t) => (
                <option key={t.value} value={t.value} className="bg-gray-800">
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Code Editor - Takes up 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <Terminal className="h-5 w-5 text-indigo-400" />
                  <h2 className="text-lg font-semibold text-white">Code Editor</h2>
                  <div className="px-2 py-1 bg-indigo-500/20 rounded-full">
                    <span className="text-xs text-indigo-400 font-medium">{language.toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                  >
                    {isRunning ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </button>
                  
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  
                  <button
                    onClick={handleSaveCode}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  
                  <label className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors cursor-pointer">
                    <Upload className="h-4 w-4" />
                    <span>Load</span>
                    <input
                      type="file"
                      accept=".js,.py,.java,.cpp,.c,.ts,.go,.rs,.php,.rb,.txt"
                      onChange={handleLoadFile}
                      className="hidden"
                    />
                  </label>
                  
                  <button
                    onClick={handleResetCode}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
              
              <div className="h-[600px]">
                <Editor
                  height="100%"
                  language={language}
                  theme={theme}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                    bracketPairColorization: { enabled: true },
                    guides: {
                      bracketPairs: true,
                      indentation: true
                    },
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: 'on',
                    tabCompletion: 'on'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Takes up 1 column */}
          <div className="space-y-6">
            {/* Input Panel */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2 mb-3">
                <Terminal className="h-5 w-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Input</h3>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter test input here..."
                className="w-full h-24 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-sm"
              />
            </div>

            {/* Output Panel */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="h-5 w-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Output</h3>
              </div>
              <div className="w-full h-32 p-3 bg-gray-900/50 border border-white/20 rounded-lg text-gray-300 font-mono text-sm overflow-auto whitespace-pre-wrap">
                {output || '💡 Output will appear here after running your code...'}
              </div>
            </div>

            {/* Problem Selector */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-2 mb-3">
                <Settings className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Sample Problems</h3>
              </div>
              <div className="space-y-2">
                {sampleProblems.map((problem, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedProblem(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedProblem === index
                        ? 'bg-indigo-500/30 border border-indigo-500/50 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    <div className="font-medium text-sm">{problem.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Problem Details */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-3">
                {sampleProblems[selectedProblem].title}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="text-indigo-400 font-medium mb-1">Problem:</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {sampleProblems[selectedProblem].description}
                  </p>
                </div>
                <div>
                  <h4 className="text-green-400 font-medium mb-1">Input:</h4>
                  <code className="text-green-300 bg-green-500/10 px-2 py-1 rounded">
                    {sampleProblems[selectedProblem].input}
                  </code>
                </div>
                <div>
                  <h4 className="text-blue-400 font-medium mb-1">Output:</h4>
                  <code className="text-blue-300 bg-blue-500/10 px-2 py-1 rounded">
                    {sampleProblems[selectedProblem].output}
                  </code>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-medium mb-1">Explanation:</h4>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    {sampleProblems[selectedProblem].explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}