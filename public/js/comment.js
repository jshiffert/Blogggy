const commentForm = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#comment-body').value.trim();
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    // const user_id = z

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, comment_text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to post comment');
        }
    }
}

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentForm);