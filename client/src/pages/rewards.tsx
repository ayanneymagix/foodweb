import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gift, Star, Trophy, TrendingUp, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Coupon, RewardHistory } from "@shared/schema";

interface RewardsProps {
  rewardPoints: number;
  rewardHistory: RewardHistory[];
  coupons: Coupon[];
}

export default function Rewards({ rewardPoints, rewardHistory, coupons }: RewardsProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const nextMilestone = Math.ceil(rewardPoints / 500) * 500;
  const progress = (rewardPoints / nextMilestone) * 100;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-rewards-title">
            Rewards & Coupons
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Earn points with every order and unlock exclusive rewards
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Points Balance Card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-8 bg-gradient-to-br from-primary via-destructive to-primary text-primary-foreground">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm opacity-90 mb-2">Your Reward Points</p>
                  <h2 className="text-5xl font-bold" data-testid="text-reward-points">{rewardPoints}</h2>
                  <p className="text-sm opacity-90 mt-2">Worth ₹{(rewardPoints * 0.1).toFixed(2)}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Gift className="h-8 w-8" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to next milestone</span>
                  <span>{rewardPoints} / {nextMilestone} pts</span>
                </div>
                <Progress value={progress} className="h-2 bg-primary-foreground/20" />
                <p className="text-xs opacity-90">
                  {nextMilestone - rewardPoints} points to your next reward!
                </p>
              </div>
            </Card>
          </motion.div>

          {/* How to Earn */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-ring" />
                How to Earn
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-ring flex-shrink-0" />
                  <span>100 pts for every ₹100 spent</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-ring flex-shrink-0" />
                  <span>150 pts for first order</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-ring flex-shrink-0" />
                  <span>50 pts for every review</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-ring flex-shrink-0" />
                  <span>200 pts on your birthday</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Active Coupons */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-serif font-semibold mb-6" data-testid="text-coupons-title">
            Active Coupons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coupons.filter(c => c.isActive).map((coupon, index) => {
              const isExpiringSoon = new Date(coupon.expiresAt).getTime() - Date.now() < 24 * 60 * 60 * 1000;
              const isCopied = copiedCode === coupon.code;

              return (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6 border-dashed border-2 hover-elevate" data-testid={`card-coupon-${coupon.id}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-ring text-primary-foreground font-mono">
                            {coupon.code}
                          </Badge>
                          {isExpiringSoon && (
                            <Badge variant="destructive" className="animate-pulse-glow">
                              Expiring Soon
                            </Badge>
                          )}
                        </div>
                        <p className="font-semibold mb-1">{coupon.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {coupon.discountType === 'percentage' 
                            ? `${coupon.discountValue}% off` 
                            : `₹${coupon.discountValue} off`}
                          {coupon.minOrderValue && ` on orders above ₹${coupon.minOrderValue}`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(coupon.code)}
                        data-testid={`button-copy-${coupon.id}`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Reward History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-serif font-semibold mb-6" data-testid="text-history-title">
            Reward History
          </h2>
          <Card className="p-6">
            {rewardHistory.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground" data-testid="text-no-history">
                  No reward history yet. Start ordering to earn points!
                </p>
              </div>
            ) : (
              <div className="space-y-4" data-testid="list-reward-history">
                {rewardHistory.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                    data-testid={`history-item-${record.id}`}
                  >
                    <div>
                      <p className="font-medium">{record.reason}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`text-lg font-semibold ${record.points > 0 ? 'text-green-600' : 'text-destructive'}`}>
                      {record.points > 0 ? '+' : ''}{record.points} pts
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
