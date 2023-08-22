import {
  Container,
  Flex,
  Card,
  Group,
  Text,
  Button,
  Modal,
  SimpleGrid,
  Input,
  Textarea,
  Space,
} from '@mantine/core';
import { useState } from 'react';
import { PostItem } from './types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as api from './api';
import { useDebounce } from 'use-debounce';

export const Question1 = () => {
  const queryClient = useQueryClient();

  const [editMode, setEditMode] = useState<'create' | 'update' | 'none'>(
    'none'
  );

  const [deleteTarget, setDeleteTarget] = useState<PostItem | null>(null);
  const [editTarget, setEditTarget] = useState<PostItem | Partial<PostItem>>(
    {}
  );
  const [editError, setEditError] = useState<Partial<PostItem>>({
    title: '',
    body: '',
  });

  const openUpdateModal = (t: PostItem) => {
    setEditMode('update');
    setEditTarget(t);
  };

  const openCreateModal = () => {
    setEditMode('create');
    setEditTarget({});
  };

  const closeEditModal = () => {
    setEditMode('none');
    setEditTarget({});
  };

  const createPostMutation = useMutation({
    mutationFn: api.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: (post: PostItem) => api.updatePost(post._id, post),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: api.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const handleDelete = async () => {
    if (deleteTarget) {
      await deletePostMutation.mutate(deleteTarget._id as string);
    }

    setDeleteTarget(null);
  };

  const handleUpdate = async () => {
    await updatePostMutation.mutate(editTarget as PostItem);
    closeEditModal();
  };

  const handleCreate = async () => {
    console.log(`create post item, ${editTarget}`);
    await createPostMutation.mutate(editTarget as PostItem);
    closeEditModal();
  };
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data: posts, isLoading } = useQuery<PostItem[]>({
    queryKey: ['posts', debouncedSearchQuery],
    queryFn: () => api.fetchPosts(searchQuery),
  });

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <Container py="md">
      <Input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Space h="md" />

      <Button onClick={openCreateModal}>Add item</Button>
      <Space h="md" />
      <Flex direction="column" gap="md">
        {posts &&
          posts.map((p) => (
            <PostCard
              key={p._id}
              data={p}
              onDelete={() => setDeleteTarget(p)}
              onEdit={() => openUpdateModal(p)}
            />
          ))}
        {posts?.length === 0 && <p>No posts found</p>}
      </Flex>
      {/* -- EDIT MODAL -- */}
      <Modal
        opened={editMode !== 'none'}
        onClose={closeEditModal}
        size="auto"
        title={`${editMode === 'create' ? 'Create' : 'Update'} Item`}
      >
        <SimpleGrid cols={1} spacing="md">
          <Input.Wrapper label="name">
            <Input
              name="title"
              placeholder="Blog title"
              error={editError.title}
              value={editTarget.title}
              onChange={(e) => {
                const errorMsg =
                  e.target.value.length === 0 ? 'Title cannot be empty' : '';

                setEditError((prev) => ({
                  ...prev,
                  title: errorMsg,
                }));

                setEditTarget({
                  ...editTarget,
                  title: e.target.value,
                });
              }}
            />
            <Space h="xs" />
            <Input.Error>{editError.title}</Input.Error>
          </Input.Wrapper>
          <Textarea
            label="body"
            name="body"
            placeholder="Blog body"
            onChange={(e) =>
              setEditTarget({
                ...editTarget,
                body: e.target.value,
              })
            }
            value={editTarget.body}
          />
        </SimpleGrid>
        <Group mt="xl">
          <Button
            variant="outline"
            onClick={editMode === 'create' ? handleCreate : handleUpdate}
            disabled={Object.values(editError).some((v) => v)}
          >
            Yes
          </Button>
          <Button variant="outline" onClick={closeEditModal}>
            No
          </Button>
        </Group>
      </Modal>
      {/* -- DELETE MODAL -- */}
      <Modal
        opened={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        size="auto"
        title="Delete item"
      >
        <Text>
          Are you sure you want to delete item "{deleteTarget?.title}"?
        </Text>

        <Group mt="xl">
          <Button variant="outline" onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>
            No
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

interface PostCardProps {
  data: PostItem;
  onDelete?: VoidFunction;
  onEdit?: VoidFunction;
}

const PostCard: React.FC<PostCardProps> = ({ data, onDelete, onEdit }) => {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder>
      <Group position="apart" mt="xs" mb="xs">
        <Text weight={500}>{data.title}</Text>
        {/* <Badge color="pink" variant="light">
          On Sale
        </Badge> */}
      </Group>
      {/*
      <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text> */}

      <Group position="left">
        <Button
          variant="light"
          color="blue"
          mt="md"
          radius="md"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="light"
          color="red"
          mt="md"
          radius="md"
          onClick={onDelete}
        >
          Delete
        </Button>
      </Group>
    </Card>
  );
};
