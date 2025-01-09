import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BaseInput } from "../../component/input";
import { Overlay } from "../../component/overlay-component";
import eye from "../../assets/eye.png";
import eyeSlash from "../../assets/eye-slash.png";
import { toast } from "react-toastify";
import StorageService from "../../helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import customAxios from "../../config/customAxios";
import { SquareButton } from "../../component/square-button";

function AdminLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [finLogin, setFinLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [password, setPassword] = useState(true);

  const onSubmit = (data) => {
    setLoading(true);
    customAxios
      .post("/auth/login", {
        username: data.username || data.finclusionID,
        password: data.password,
        platformId: 5,
      })
      .then((res) => {
        StorageService.setToken(res.token);
        dispatch(loginSuccess(res.user));
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = "Jobs Pro | Admin Login";
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <form
      style={{ maxWidth: 400, width: "100%" }}
      className="py-6 px-4 grid grid-cols-1 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {loading && <Overlay />}
      <div>
        <p className={"text-primary text-3xl font-bold"}>Administrator Login</p>
        <p className="text-sm text-gray-500">
          Please login with your email address
        </p>
      </div>

      {finLogin ? (
        <div>
          <BaseInput
            label="Email Address"
            {...register("username", {
              required: "This field is required",
              setValueAs: (v) => v.trim(),
            })}
            error={errors.username}
            errorText={errors.username && errors.username.message}
          />
        </div>
      ) : (
        <div>
          <BaseInput
            label="Finclusion ID"
            {...register("finclusionID", {
              required: "This field is required",
              setValueAs: (v) => v.trim(),
            })}
            placeholder="Enter Finclusion ID"
            error={errors.finclusionID}
            errorText={errors.finclusionID && errors.finclusionID.message}
          />
        </div>
      )}
      <div className="relative">
        <BaseInput
          label="Password"
          type={password ? "password" : "text"}
          {...register("password", {
            required: "The field is required",
            setValueAs: (v) => v.trim(),
          })}
          error={errors.password}
          errorText={errors.password && errors.password.message}
        />
        <img
          src={password ? eye : eyeSlash}
          onClick={() => setPassword(!password)}
          className={`absolute cursor-pointer ${
            password ? "h-4" : "h-6"
          } transition-all ease-linear duration-300`}
          style={{
            top: password ? "2.5rem" : "2.25rem",
            right: "1rem",
          }}
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          {/* <Checkbox
						textPosition="right"
						value={remember}
						onChange={(e) => setRemember(e.target.checked)}
						label="Remember me for 30 days"
					/> */}
        </div>
        <div
          className={`text-sm text-primary font-semibold hover:underline`}
          onClick={() => navigate("/forgot-password")}
        >
          forgot password
        </div>
      </div>
      <div>
        <SquareButton type="submit">Login</SquareButton>
      </div>
      {/* <div className="flex items-center text-xs text-gray-400 gap-2">
        <div
          className="flex-1 bg-gray-200 rounded-full"
          style={{
            height: 1,
          }}
        />
        <span>Or continue with</span>
        <div
          className="flex-1 bg-gray-200 rounded-full"
          style={{
            height: 1,
          }}
        />
      </div> */}
      <div className="flex justify-center">
        <div
          onClick={() => setFinLogin((prev) => !prev)}
          className="select-none flex items-center text-xs p-2 rounded-full bg-gray-100 gap-2 cursor-pointer hover:bg-gray-200"
        >
          {/* <img
            src={finLogin ? finclusionIcon : login}
            alt="Form Icon"
            className="h-4"
          /> */}
          {/* <span>
            {finLogin
              ? "Login with Finclusion ID"
              : "your email or phone number"}
          </span> */}
        </div>
      </div>
    </form>
  );
}

export default AdminLoginPage;
