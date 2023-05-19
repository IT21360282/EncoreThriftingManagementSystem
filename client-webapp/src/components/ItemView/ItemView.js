import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './itemView.css';
import axios from 'axios';

export default function ItemView() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8000/user/MyProfile', { token });
        const { status, data } = response.data;
        if (status === 'ok') {
          setUserData(data);
        } else if (status === 'error') {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/display/getItemById/${id}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const itemId = item && item._id;

  const getCommentList = useCallback(() => {
    axios
      .get('http://localhost:8000/comment/getComments')
      .then((res) => {
        console.log(res.data);
        const filteredItems = res.data.filter((comment) => comment.itemId === itemId);
        setCommentList(filteredItems.reverse());
      })
      .catch((err) => console.log(err));
  }, [itemId]);

  useEffect(() => {
    getCommentList();
  }, [getCommentList]);

  if (!item) {
    return <div className='displayBox'>Loading...</div>;
  }

  const userId = userData && userData._id;

  async function addToCart(item, userId) {
    try {
      const cartItem = {
        userId: userId,
        item: item,
        pImageURL: item.pImageURL,
        pName: item.pName,
        pDescription: item.pDescription,
        pPrice: item.pPrice,
        quantity: item.quantity,
      };

      const response = await axios.post('http://localhost:8000/cart/addToCart', cartItem);
      console.log(response.data);
      alert('Item added to Cart');
    } catch (error) {
      console.log(error);
    }
  }

  async function addComment(itemId, userId) {
    try {
      const commentData = {
        itemId: itemId,
        userId: userId,
        fullName: userData.fname,
        comment: comment,
      };

      const response = await axios.post('http://localhost:8000/comment/saveComment', commentData);
      console.log(response.data);
      alert('New comment added');

      setComment('');
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    const userId = userData && userData._id;

    if (userId) {
      navigate(`/PaymentPhase01/${item._id}`);
    } else {
      navigate('/Signup');
    }
  };

  const handleAddToCart = () => {
    const userId = userData && userData._id;

    if (userId) {
      addToCart(item, userId);
    } else {
      navigate('/Signup');
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(itemId, userId);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleDeleteComment = (commentId) => {
    console.log('Deleting comment with id:', commentId);
    const deletedComment = commentList.find((comment) => comment._id === commentId);
    if (!deletedComment) {
      console.error('Comment not found');
      return;
    }
    axios
      .delete(`http://localhost:8000/comment/deleteComment/${commentId}`)
      .then(() => {
        console.log('Comment deleted');
        getCommentList();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateComment = (commentId, newComment) => {
    console.log('Updating comment with id:', commentId);
    axios
      .put(`http://localhost:8000/comment/updateComment/${commentId}`, { comment: newComment })
      .then(() => {
        console.log('Comment updated');
        getCommentList();
        setEditCommentId(null);
        setEditedComment('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='displayBox'>
      <div className='itemBox'>
        <div className='itemBoxup'>
          <div className='image'>
            <img src={item.pImageURL} alt={item.pName} />
          </div>
          <div className='description'>
            <p>
              <b>Description: </b>
            </p>
            <p>{item.pDescription}</p>
            <br />
            <p>
              <b>Category :</b> {item.pCategory}
            </p>
            <p>
              <b>Sub Category : </b>
              {item.pSubCategory}
            </p>
            <p>
              <b>Name : </b>
              {item.pName}
            </p>
            <p>
              <b>Price : </b>Rs.{item.pPrice}.00
            </p>
          </div>
        </div>
        <br />
        <div className='itembuttonBox'>
          <button onClick={handleClick} className='itemViewbtn' id='viewbtn'>
            Checkout
          </button>
          <button className='itemViewbtn' onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
      <div className='commentSection'>
        <h3 className='pageTitle'>Add your comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <div className='comment'>
            <textarea className='commentInput' value={comment} onChange={handleCommentChange}></textarea>
            <br />
            <div className='buttonBox'>
              <button className='commentSubmitBtn' type='submit'>
                Post
              </button>
            </div>
          </div>
        </form>
        <div className='commentList'>
          <div className='comments'>
            {commentList.map((comment) => (
              <div className='commentArea' key={comment._id}>
                <h3>{comment.fullName}</h3>
                {comment.userId === userId && (
                  <div>
                    {editCommentId === comment._id ? (
                      <div>
                        <textarea
                          className='commentDisplay'
                          value={editedComment}
                          onChange={(e) => setEditedComment(e.target.value)}
                        ></textarea>
                        <div className='btnArea'>
                          <button className='userBtns' onClick={() => handleUpdateComment(comment._id, editedComment)}>
                            Save
                          </button>
                          <button className='userBtns' onClick={() => setEditCommentId(null)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <textarea className='commentDisplay' value={comment.comment} readOnly></textarea>
                        <div className='btnArea'>
                          <button className='userBtns' onClick={() => setEditCommentId(comment._id)}>
                            Edit
                          </button>
                          <button className='userBtns' onClick={() => handleDeleteComment(comment._id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
