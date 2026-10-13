export interface Hobby { title: string; description: string; icon: 'travel' | 'chess' | 'gaming' | 'tech' | 'running' }
export const hobbies: Hobby[] = [
  { title: 'Travel', description: 'I like discovering new places. Different places, different perspectives.', icon: 'travel' },
  { title: 'Chess', description: 'Feels amazing when I win. Character development when I lose.', icon: 'chess' },
  { title: 'Gaming', description: 'Side quests, strategy, and occasionally questionable decisions.', icon: 'gaming' },
  { title: 'Exploring Tech', description: "There's always something new to break, understand, or build.", icon: 'tech' },
  { title: 'Running', description: 'My way of hitting the reset button.', icon: 'running' },
];
