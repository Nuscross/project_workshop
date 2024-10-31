/// React Query ///

// Install

npm i @tanstack/react-query

/* --------------------------------- */

// Setup React Query

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

/* --------------------------------- */

// Fetch Data

const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/tasks',
});

const Items = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/something');
      return data;
    },
  });

  if (isLoading) {
    return <p style={{ marginTop: '1rem ' }}>Loading...</p>;
  }

  // if (isError) {
  //   return <p style={{ marginTop: '1rem ' }}>there was an error...</p>;
  // }

  if (error) {
    return <p style={{ marginTop: '1rem ' }}>{error.message}</p>;
  }

  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};

/* --------------------------------- */

// Create Data

const queryClient = useQueryClient();

const { mutate: createTask, isLoading } = useMutation({
  mutationFn: (taskTitle) => customFetch.post('/', { title: taskTitle }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
  onError: (error) => {
    toast.error(error.response.data.msg);
  },
});

const handleSubmit = (e) => {
  e.preventDefault();
  createTask(newItemName);
};

/* --------------------------------- */

// Edit Data

const queryClient = useQueryClient();

const { mutate: editTask } = useMutation({
  mutationFn: ({ taskId, isDone }) => {
    return customFetch.patch(`/${taskId}`, { isDone });
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
})

<input
  type='checkbox'
  checked={item.isDone}
  onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
/>

/* --------------------------------- */

// Delete Data

const queryClient = useQueryClient();

const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
  mutationFn: (taskId) => {
    return customFetch.delete(`/${taskId}`);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
});

<button className='btn remove-btn'
  type='button'
  disabled={deleteTaskLoading}
  onClick={() => deleteTask(item.id)}
>
  delete
</button>

/* --------------------------------- */

// External React Query

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from './utils';
import { toast } from 'react-toastify';
export const useFetchTasks = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/');
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post('/', { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task added');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, isLoading };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  return { editTask };
};
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
    mutationFn: (taskId) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  return { deleteTask, deleteTaskLoading };
};

/* --------------------------------- */

// Properties

// 1. staleTime

// Use Examples:

// Product Listings: If you're fetching product data from an API that only updates once a day, 
// you can set a longer staleTime, such as staleTime: 86400000 (1 day).

// User Profile Data: User profile details typically don’t change often. Setting a higher staleTime 
// ensures the data remains fresh and avoids refetching each time the component mounts.

// When NOT to use:

// When you're dealing with real-time data (e.g., stock prices or live scores), because you want fresh data frequently.

useQuery('userProfile', fetchUserProfile, {
  staleTime: 600000 // 10 minutes, so it won't refetch within this time window
});

/* --------------------------------- */

// 2. cacheTime

// Use Examples:

// Pagination: When a user navigates between pages in a paginated list, you might want to keep the previous pages in memory 
// so they don’t need to be refetch when the user goes back.

// Tab-based Navigation: If you have a tabbed interface and the user switches between tabs, keeping the cached data for each 
// tab can avoid unnecessary refetching when switching back to a previously viewed tab.

// When NOT to use:

// If memory usage is a concern or if your data updates frequently, keeping the cache for too long might cause outdated data to persist in memory.

useQuery('paginatedData', fetchData, {
  cacheTime: 1000 * 60 * 10 // Keep cached data for 10 minutes after it's no longer used
});

/* --------------------------------- */

// 3. refetchInterval

// Use Examples:

// Live Scores/Stock Prices: In cases where data changes rapidly, you might want to refetch every few seconds to provide live updates.

// Chat/Messaging Apps: You can use refetchInterval to poll for new messages at regular intervals, ensuring the UI reflects the latest data.

// When NOT to use:

// If you don’t need real-time updates or the data changes infrequently, as frequent polling can lead to unnecessary network requests and resource usage.

useQuery('liveScores', fetchScores, {
  refetchInterval: 5000 // Refetch data every 5 seconds
});
