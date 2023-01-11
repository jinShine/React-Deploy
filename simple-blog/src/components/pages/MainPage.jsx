import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { RouterPath } from "../../shared/Router";
import PostList from "../list/post/PostList";
import Button from "../ui/Button";
import Header from "../ui/Header";
import Wrapper from "../ui/Wrapper";
import { __deletePost, __getPosts } from "../../redux/modules/postsSlice";

const MainPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, posts, error } = useSelector((state) => state.posts);

  const onClickWriteHandler = () => {
    navigate(RouterPath.postWrite);
  };

  const onClickPostItemHandler = (post) => {
    const { id } = post;
    console.log("DKDKDKDKKDKD", id);
    navigate(`/post/${id}`);
  };

  const onClickDeleteHandler = (post) => {
    dispatch(__deletePost(post.id));
  };

  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  return (
    <Wrapper>
      <SWrapper>
        <Header title={"Jinnify 블로그"} />
        <SContainer>
          <Button title="글 작성하기" onClick={onClickWriteHandler} />
          <PostList
            posts={posts}
            onClickItem={onClickPostItemHandler}
            onClickDelete={onClickDeleteHandler}
          />
        </SContainer>
        <div>{posts.title}</div>
      </SWrapper>
    </Wrapper>
  );
};

export default MainPage;

/* Style */
const SWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  max-width: calc(100% - 200px);

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
