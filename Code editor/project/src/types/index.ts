export interface User {
  id: string
  email: string
  username: string
  created_at: string
}

export interface Problem {
  id: string
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: string
  input_format: string
  output_format: string
  sample_input: string
  sample_output: string
  test_cases: TestCase[]
  created_at: string
}

export interface TestCase {
  input: string
  expected_output: string
}

export interface Submission {
  id: string
  user_id: string
  problem_id: string
  code: string
  language: string
  status: 'Pending' | 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error'
  execution_time?: number
  memory_used?: number
  created_at: string
}

export interface CodingPlatform {
  name: string
  url: string
  description: string
  category: string
  icon: string
}