import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function fetchRecords({ signal, currentPage, pageSize }: any) {
  const response = await fetch(
    `http://localhost:3001/records?currentPage=${currentPage}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      (await response.json()) || 'Error while fetching the records'
    );
  }

  return await response.json();
}

export async function fetchRecord({ id, signal }: { id: string; signal: any }) {
  const response = await fetch(`http://localhost:3001/records/${id}`, {
    signal,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()) || 'Error while fetching the record'
    );
  }

  return await response.json();
}

export async function updateEvent({ id, event }: { id: any; event: any }) {
  const response = await fetch(`http://localhost:3001/records/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ event }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()) || 'Error while updating the record'
    );
  }

  return response.json();
}

export async function deleteRecord({ id }: { id: string }) {
  const response = await fetch(`http://localhost:3001/records/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()) || 'Error while updating the record'
    );
  }

  return response.json();
}
