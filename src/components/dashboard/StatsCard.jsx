import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatsCard({ title, value, subtitle, icon: Icon, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
        <div className={`absolute inset-0 opacity-5 ${gradient}`} />
        <div className="relative p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
            <div className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}