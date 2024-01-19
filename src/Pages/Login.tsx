import React from 'react';


const Login = () => {
  return (
    <section>
      <div className="login-container">
      <div className="grid__item large--one-half medium--one-half small--one-whole pd-left110 text-left br-right">
        <div className="width-80">
          <h1 className="text-2xl font-bold leading-9 text-black">Đăng nhập</h1>
          <div className="desc_login">Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!</div>
          <form className="form-vertical">
            <label htmlFor="Email">Email</label>
            <input type="email" id="Email" className="input-full" placeholder="Email"  />

            <label htmlFor="Password">Mật khẩu</label>
            <input type="password" id="Password" className="input-full" placeholder="mật khẩu" />
            <a href="">Quên mật khẩu</a>
           <p>
           <input type="submit" className="bg-black text-white w-full py-2 px-4 rounded-none" value="Đăng nhập"/>
           </p>
          </form>
        </div>
      </div>
        <div className="grid__item large--one-half medium--one-half small--one-whole pd-left110 text-left ">
        <div className="width-80">
          <h1 className="text-2xl font-bold leading-9 text-black">Đăng ký</h1>
          <div className="desc_login">Hãy đăng ký ngay để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!</div>
          <div className="form-vertical">
            <form acceptCharset="UTF-8" action="/account" id="create_customer" method="post">
              <input name="form_type" type="hidden" value="create_customer" />
              <input name="utf8" type="hidden" value="✓" />

              <label htmlFor="FirstName">Họ</label>
              <input type="text" name="first_name" id="FirstName" className="input-full" placeholder="Họ"  />

              <label htmlFor="LastName">Tên</label>
              <input type="text" name="last_name" id="LastName" className="input-full" placeholder="Tên" />

              <label htmlFor="Email">Email</label>
              <input type="email" name="email" id="Email" className="input-full" placeholder="Email"  />

              <label htmlFor="Phone">Số điện thoại</label>
              <input type="text" name="phone" id="Phone" className="input-full" placeholder="Số điện thoại" />

              <label htmlFor="CreatePassword">Mật khẩu</label>
              <input type="password" name="password" id="CreatePassword" className="input-full" placeholder="Mật khẩu" />

              <div id="verified_email" className="clearfix large_form">
                <input type="checkbox"  /> Đăng ký nhận bản tin
              </div>

              <div id="verified_policy" className="clearfix large_form">
                <input type="checkbox" /> Tôi đồng ý với các  <a href="">điều khoản</a>  của TND
              </div>

              <p>
           <input type="submit" className="bg-black text-white w-full py-2 px-4 rounded-none" value="Đăng ký"/>
           </p>
            </form>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Login;