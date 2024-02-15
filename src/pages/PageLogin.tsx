import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

export const PageLogin = () => {
	const { loginFormData, handleLoginFormFieldChange, handleLoginFormSubmit } =
		useContext(AppContext);

	const navigate = useNavigate();

	return (
		<form
			className="mt-2 flex flex-col gap-3 w-[19rem] bg-slate-300 pt-6 px-4 pb-4 rounded-lg"
			onSubmit={(e) =>
				handleLoginFormSubmit(e, () => navigate("/welcome"))
			}
		>
			<div className="flex gap-3">
				<label className="w-[4.5rem]" htmlFor="login">
					Login:
				</label>
				<input
					autoFocus
					value={loginFormData.login}
					onChange={(e) =>
						handleLoginFormFieldChange("login", e.target.value)
					}
					type="text"
					id="login"
				/>
			</div>
			<div className="flex gap-3">
				<label className="w-[4.5rem]" htmlFor="password">
					Password:
				</label>
				<input
					value={loginFormData.password}
					onChange={(e) =>
						handleLoginFormFieldChange("password", e.target.value)
					}
					id="password"
					type="password"
				/>
			</div>
			<div className="flex justify-between pr-2">
				<div className="text-red-600">{loginFormData.message}</div>
				<button className="bg-slate-200 px-2 py-1 rounded">
					Login
				</button>
			</div>
		</form>
	);
};
