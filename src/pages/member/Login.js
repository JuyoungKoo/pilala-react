import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginCSS from './Login.module.css';
import { callLoginAPI } from '../../apis/MemberAPICalls';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //API 요청을 통해서 반환 된 로그인 결과 값
  const login = useSelector((state) => state.memberReducer);

  useEffect(() => {
    if (login.status === 200) {
      console.log('[Login] Login SUCCESS {}', login);
      navigate('/', { replace: true });
    }
  }, [login]);

  // 폼 데이터를 한 번에 변경 및 state 저장
  const [form, setForm] = useState({
    memberId: '',
    memberPassword: '',
  });

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 버튼 클릭 시 디스패처 실행
  const onClickHandler = () => {
    dispatch(
      callLoginAPI({
        form: form,
      }),
    );
  };

  // 회원가입 버튼 클릭 시 회원 가입 페이지로 이동
  const onClickRegisterHandler = () => {
    navigate('/register', { replace: true });
  };

  return (
    <>
      <div className={LoginCSS.backgroundDiv}>
        <div className={LoginCSS.loginDiv}>
          <h1 className='font-bold text-2xl'>로그인</h1>
          <input
            className="border-1 border-gray-400 px-2 text-xs"
            type="text"
            name="memberId"
            placeholder="아이디를 입력하세요."
            autoComplete="off"
            onChange={onChangeHandler}
          />
          <input
            className="border-1 border-gray-400 px-2 text-xs"
            type="password"
            name="memberPassword"
            placeholder="패스워드를 입력하세요."
            autoComplete="off"
            onChange={onChangeHandler}
          />
          <button className="border-1 border-gray-400 px-2 text-xs" onClick={onClickHandler}>
            로그인
          </button>
          <button
            className='mt-4 text-xs text-blue-300'
            onClick={onClickRegisterHandler}
          >
            회원가입
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
