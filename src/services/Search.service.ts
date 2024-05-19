'use client';

import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { fetch3DModel, generate3dModel } from './api/api';
import toast from 'react-hot-toast';

interface SearchFormValues {
  prompt: string;
}

const schema = z.object({
  prompt: z.string({ required_error: 'Must Be Filled' }).min(3),
});

export const SearchService = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [objUrl, setObjUrl] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(schema),
  });

  const [pollingInterval, setPollingInterval] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (input: SearchFormValues) => generate3dModel(input),
    onSuccess: (data) => {
      const fetchModelStatus = async () => {
        try {
          const response = await fetch3DModel(data.data.result);
          console.log(data.data.result);
          setProgress(50);
          if (response.data.status === 'SUCCEEDED') {
            setProgress(100);
            clearInterval(pollingInterval!);
            console.log(response.data.video_url);
            setVideoUrl(response.data.video_url);
            setObjUrl(response.data.model_urls.glb);
            setIsLoading(false);
          } else if (response.data.status !== 'IN_PROGRESS') {
            setIsLoading(false);
            clearInterval(pollingInterval!);
            toast.error('An error occurred while generating the model.');
          }
        } catch (error: any) {
          clearInterval(pollingInterval!);
          toast.error(error.response?.data?.error || 'An error occurred');
        }
      };

      const interval = setInterval(fetchModelStatus, 3000);
      setPollingInterval(interval);
    },

    onError: (error: any) => {
      setIsLoading(false);
      toast.error(error.response?.data?.error || 'An error occurred');
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    setIsLoading(true);
    setProgress(20);
    console.log(data);
    mutate(data);
  };

  return {
    onSubmit,
    videoUrl,
    objUrl,
    register,
    errors,
    handleSubmit,
    isLoading,
    progress,
  };
};
