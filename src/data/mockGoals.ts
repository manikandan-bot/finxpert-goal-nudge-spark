
import { Goal, GoalCategory } from '../types/goals';

export const goalTemplates = [
  {
    name: 'Emergency Fund',
    category: 'emergency' as GoalCategory,
    icon: 'shield',
    description: 'Save 3-6 months of expenses for unexpected emergencies.',
  },
  {
    name: 'Retirement Fund',
    category: 'retirement' as GoalCategory,
    icon: 'umbrella',
    description: 'Start saving for your retirement and future financial security.',
  },
  {
    name: 'Education Fund',
    category: 'education' as GoalCategory,
    icon: 'graduation-cap',
    description: 'Save for education expenses for yourself or your children.',
  },
  {
    name: 'Debt Repayment',
    category: 'debt' as GoalCategory,
    icon: 'credit-card',
    description: 'Pay off your debts faster and become financially free.',
  },
  {
    name: 'Travel Fund',
    category: 'travel' as GoalCategory,
    icon: 'plane',
    description: 'Save for your dream vacation or travel adventure.',
  },
  {
    name: 'Home Purchase',
    category: 'home' as GoalCategory,
    icon: 'home',
    description: 'Save for a down payment on your dream home.',
  },
  {
    name: 'Vehicle Purchase',
    category: 'car' as GoalCategory,
    icon: 'car',
    description: 'Save for a new vehicle or major vehicle expense.',
  },
  {
    name: 'Wedding Fund',
    category: 'wedding' as GoalCategory,
    icon: 'heart',
    description: 'Save for your wedding or other special celebration.',
  },
];

export const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 300000,
    currentAmount: 120000,
    deadline: new Date('2025-12-31'),
    description: 'Building a safety net for unexpected expenses',
    category: 'emergency',
    icon: 'shield',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-15'),
    milestones: [
      {
        id: 'm1',
        goalId: '1',
        percentage: 25,
        achieved: true,
        message: 'You\'ve saved 25% of your emergency fund!',
        achievedAt: new Date('2024-02-15'),
      },
      {
        id: 'm2',
        goalId: '1',
        percentage: 50,
        achieved: false,
        message: 'Halfway to your emergency fund goal!',
      },
      {
        id: 'm3',
        goalId: '1',
        percentage: 75,
        achieved: false,
        message: 'Almost there! 75% of your emergency fund saved.',
      },
      {
        id: 'm4',
        goalId: '1',
        percentage: 100,
        achieved: false,
        message: 'Congratulations! You\'ve fully funded your emergency fund!',
      },
    ],
    nudges: [
      {
        id: 'n1',
        goalId: '1',
        message: 'Try saving an extra ₹5,000 this month to reach your next milestone faster!',
        type: 'suggestion',
        dismissed: false,
        createdAt: new Date('2024-03-01'),
      },
      {
        id: 'n2',
        goalId: '1',
        message: 'Great progress! You\'re doing better than 70% of savers.',
        type: 'encouragement',
        dismissed: false,
        createdAt: new Date('2024-03-10'),
      },
    ],
  },
  {
    id: '2',
    name: 'New Laptop',
    targetAmount: 85000,
    currentAmount: 65000,
    deadline: new Date('2024-08-15'),
    description: 'Saving for a new work laptop',
    category: 'custom',
    icon: 'laptop',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-04-01'),
    milestones: [
      {
        id: 'm5',
        goalId: '2',
        percentage: 25,
        achieved: true,
        message: 'You\'ve saved 25% for your new laptop!',
        achievedAt: new Date('2024-02-01'),
      },
      {
        id: 'm6',
        goalId: '2',
        percentage: 50,
        achieved: true,
        message: 'Halfway to your new laptop!',
        achievedAt: new Date('2024-03-05'),
      },
      {
        id: 'm7',
        goalId: '2',
        percentage: 75,
        achieved: false,
        message: 'Almost there! 75% saved for your new laptop.',
      },
      {
        id: 'm8',
        goalId: '2',
        percentage: 100,
        achieved: false,
        message: 'Congratulations! You can now buy your new laptop!',
      },
    ],
    nudges: [
      {
        id: 'n3',
        goalId: '2',
        message: 'You\'re so close! Just ₹20,000 more to go for your new laptop.',
        type: 'encouragement',
        dismissed: false,
        createdAt: new Date('2024-04-01'),
      },
    ],
  },
  {
    id: '3',
    name: 'Goa Vacation',
    targetAmount: 60000,
    currentAmount: 15000,
    deadline: new Date('2024-12-20'),
    description: 'End of year family vacation to Goa',
    category: 'travel',
    icon: 'plane',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-20'),
    milestones: [
      {
        id: 'm9',
        goalId: '3',
        percentage: 25,
        achieved: true,
        message: 'You\'ve saved 25% for your Goa vacation!',
        achievedAt: new Date('2024-03-15'),
      },
      {
        id: 'm10',
        goalId: '3',
        percentage: 50,
        achieved: false,
        message: 'Halfway to your Goa vacation savings!',
      },
      {
        id: 'm11',
        goalId: '3',
        percentage: 75,
        achieved: false,
        message: 'Almost there! 75% saved for your Goa vacation.',
      },
      {
        id: 'm12',
        goalId: '3',
        percentage: 100,
        achieved: false,
        message: 'Congratulations! Your Goa vacation is fully funded!',
      },
    ],
    nudges: [
      {
        id: 'n4',
        goalId: '3',
        message: 'If you save an extra ₹5,000 monthly, you\'ll reach your goal 2 months earlier!',
        type: 'suggestion',
        dismissed: false,
        createdAt: new Date('2024-03-20'),
      },
    ],
  },
];
