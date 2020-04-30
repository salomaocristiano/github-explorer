import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
  theme: string;
}

interface ThemeProps {
  theme: string;
}

export const Title = styled.h1<ThemeProps>`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;

  ${(props) =>
    props.theme === 'dark' &&
    css`
      color: #fff;
    `}
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    ${(props) =>
      props.theme === 'dark' &&
      css`
        background: #36393f;
        border-color: #36393f;
        color: #fff;
      `}

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    ${(props) =>
      props.theme === 'dark' &&
      css`
        background: #7289da;
      `}

    &:hover {
      background: ${shade(0.2, '#04d361')};
      ${(props) =>
        props.theme === 'dark' &&
        css`
          background: ${shade(0.2, '#7289da')};
        `}
    }
  }
`;

export const Repositories = styled.div<ThemeProps>`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    transition: transform 0.2s;

    display: flex;
    align-items: center;

    ${(props) =>
      props.theme === 'dark' &&
      css`
        background: #36393f;
      `}

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 16px;
    }

    div {
      margin-left: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;

        ${(props) =>
          props.theme === 'dark' &&
          css`
            color: #fff;
          `}
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
