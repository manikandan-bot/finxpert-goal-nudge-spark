
import React, { useState } from 'react';
import { Nudge } from '@/types/goals';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, AlertCircle, Lightbulb, Trophy, Heart, Plus, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NudgeContainerProps {
  nudges: Array<Nudge & { goalName: string; goalId: string }>;
  onDismiss: (goalId: string, nudgeId: string) => void;
}

type NudgeCategory = 'all' | 'encouragement' | 'suggestion' | 'warning' | 'celebration';

const NudgeContainer: React.FC<NudgeContainerProps> = ({ nudges, onDismiss }) => {
  const [activeCategory, setActiveCategory] = useState<NudgeCategory>('all');
  
  // Exit early if no nudges
  if (nudges.length === 0) return null;
  
  const getNudgeIcon = (type: Nudge['type']) => {
    switch (type) {
      case 'encouragement':
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'celebration':
        return <Trophy className="h-5 w-5 text-green-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
    }
  };
  
  const getNudgeColor = (type: Nudge['type']) => {
    switch (type) {
      case 'encouragement':
        return "bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200";
      case 'suggestion':
        return "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200";
      case 'warning':
        return "bg-gradient-to-br from-red-50 to-orange-50 border-red-200";
      case 'celebration':
        return "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200";
      default:
        return "bg-gradient-to-br from-finxpert-soft-purple to-finxpert-light border-finxpert-light";
    }
  };

  const nudgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };
  
  const filteredNudges = activeCategory === 'all' 
    ? nudges 
    : nudges.filter(nudge => nudge.type === activeCategory);

  const categoryCount = {
    all: nudges.length,
    encouragement: nudges.filter(n => n.type === 'encouragement').length,
    suggestion: nudges.filter(n => n.type === 'suggestion').length,
    warning: nudges.filter(n => n.type === 'warning').length,
    celebration: nudges.filter(n => n.type === 'celebration').length
  };
  
  return (
    <div className="mb-8 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium text-gray-800">Your Nudges</h2>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center space-x-1 bg-white shadow-sm hover:shadow border border-finxpert-light"
        >
          <Filter className="h-3.5 w-3.5 text-finxpert-secondary" />
          <span className="text-xs font-medium">Filter</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveCategory(value as NudgeCategory)}>
        <TabsList className="grid grid-cols-5 mb-4 bg-finxpert-soft-purple/50">
          <TabsTrigger value="all" className="text-xs">
            All ({categoryCount.all})
          </TabsTrigger>
          <TabsTrigger value="encouragement" className="text-xs">
            <Heart className="h-3 w-3 mr-1" /> ({categoryCount.encouragement})
          </TabsTrigger>
          <TabsTrigger value="suggestion" className="text-xs">
            <Lightbulb className="h-3 w-3 mr-1" /> ({categoryCount.suggestion})
          </TabsTrigger>
          <TabsTrigger value="warning" className="text-xs">
            <AlertCircle className="h-3 w-3 mr-1" /> ({categoryCount.warning})
          </TabsTrigger>
          <TabsTrigger value="celebration" className="text-xs">
            <Trophy className="h-3 w-3 mr-1" /> ({categoryCount.celebration})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredNudges.map((nudge, i) => (
              <motion.div
                key={nudge.id}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={nudgeVariants}
                layout
              >
                <Card 
                  className={cn(
                    "p-4 border backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300",
                    getNudgeColor(nudge.type)
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/60 backdrop-blur-sm rounded-full">
                        {getNudgeIcon(nudge.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium">{nudge.goalName}</p>
                          <Badge variant="outline" className="text-[0.65rem] py-0 px-1.5 h-4 bg-white/70 backdrop-blur-sm">
                            {nudge.type.charAt(0).toUpperCase() + nudge.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">{nudge.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(nudge.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0 rounded-full hover:bg-white/70"
                      onClick={() => onDismiss(nudge.goalId, nudge.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="encouragement" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* The same card rendering logic will be handled by the 'all' tab filter */}
          </div>
        </TabsContent>
        
        <TabsContent value="suggestion" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* The same card rendering logic will be handled by the 'all' tab filter */}
          </div>
        </TabsContent>
        
        <TabsContent value="warning" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* The same card rendering logic will be handled by the 'all' tab filter */}
          </div>
        </TabsContent>
        
        <TabsContent value="celebration" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* The same card rendering logic will be handled by the 'all' tab filter */}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-4">
        <Button 
          size="sm"
          className="rounded-full w-10 h-10 p-0 bg-finxpert-primary hover:bg-finxpert-vivid-purple shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add nudge</span>
        </Button>
      </div>
    </div>
  );
};

export default NudgeContainer;
