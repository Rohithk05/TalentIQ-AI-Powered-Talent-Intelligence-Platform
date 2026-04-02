import { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { runAgent } from '@/services/mockAgentService';
import type { AgentType, AgentRun } from '@/types/agent';

export function useAgentRun() {
  const { addRun, updateRun } = useWorkspaceStore();
  const [currentRunId, setCurrentRunId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stepLabel, setStepLabel] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const startRun = useCallback(
    async (input: Record<string, string>, agentType: AgentType) => {
      const id = nanoid(10);
      const run: AgentRun = {
        id,
        agentType,
        status: 'queued',
        progress: 0,
        input,
        createdAt: new Date().toISOString(),
      };

      addRun(run);
      setCurrentRunId(id);
      setIsRunning(true);
      setProgress(0);
      setStepLabel('Initializing...');

      // Transition to running
      updateRun(id, { status: 'running' });

      try {
        const output = await runAgent(input, agentType, (pct, label) => {
          setProgress(pct);
          setStepLabel(label);
          updateRun(id, { progress: pct });
        });

        updateRun(id, {
          status: 'done',
          progress: 100,
          output,
          completedAt: new Date().toISOString(),
        });

        setIsRunning(false);
        return output;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        updateRun(id, {
          status: 'failed',
          error: errorMessage,
          completedAt: new Date().toISOString(),
        });
        setIsRunning(false);
        throw err;
      }
    },
    [addRun, updateRun]
  );

  return {
    startRun,
    currentRunId,
    progress,
    stepLabel,
    isRunning,
  };
}
