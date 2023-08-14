const container = document.querySelector('.blog_feed');

const deleteBlog = async (id, target) => {
  console.log('update Blog Function... ' + id);

  const response = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    target.closest('.card').remove();
  } else {
    return console.log('nothing to delete');
  }
};

const openEditor = async (id) => {
  console.log('editing...');

  await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ is_editing: true }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  location.reload();
};

const handleUpdateSubmit = async (id, title, text) => {
  console.log('saving...');

  if (title && text) {
    const response = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, text, is_editing: false }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to update');
    }
  }
};

const handleCancel = async (id) => {
  console.log('editing...');

  await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ is_editing: false }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  location.reload();
};

const openComments = async (id, commentList) => {
  console.log('opening comments for blog id: ', id);
  commentList.innerHTML = '';

  const response = await fetch(`/api/blog/${id}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const commentsData = await response.json(); // Parse JSON response

  const length = commentsData.comments.length;

  if (length <= 0) {
    commentList.innerHTML = 'No Comments Yet';
  }

  for (let i = 0; i < commentsData.comments.length; i++) {
    commentList.innerHTML += `
    <li style="width: 100%; display: flex; justify-content: space-between; margin: 10px 0px;">
      <div>
        ${commentsData.comments[i].text}
      </div>
      <div>
        ${commentsData.comments[i].user.username} on ${dayjs(commentsData.comments[i].createdAt).format('MM/DD/YYYY')}
      </div
    </li>`;
  }
};

// Attach event listener to entire card
container.addEventListener('click', async (event) => {
  const target = event.target;
  const action = target.getAttribute('data-action');
  const blogId = target.getAttribute('data-id');
  const card = target.closest('.card'); // Find the closest parent with the .card class

  if (action === 'delete') {
    deleteBlog(blogId, target);
  } else if (action === 'edit') {
    openEditor(blogId);
  } else if (action === 'save') {
    const title = card.querySelector('#new_blog_title').value.trim();
    const text = card.querySelector('#new_blog_content').value.trim();
    handleUpdateSubmit(blogId, title, text);
  } else if (action === 'cancel') {
    handleCancel(blogId);
  } else if (action === 'comments') {
    const commentState = target.getAttribute('data-state');
    const commentList = card.querySelector('#comment_list');
    if (commentState === 'closed') {
      target.setAttribute('data-state', 'open');
      openComments(blogId, commentList);
    } else {
      console.log('closed');
      target.setAttribute('data-state', 'closed');
    }
  }
});
