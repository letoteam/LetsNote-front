import React, {FC, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {sendResetLink} from "../authSlice";
import {useAppDispatch} from "../../../app/hooks";

const ForgotPassword : FC = () => {
    const [responseMsg, setResponseMsg] = useState('');
    const [error, setValidationError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    type IFormInput = {
        email: string
    }
    const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        mode: 'onBlur',
        defaultValues: {
            email: ''
        }
    });

    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        try {
            dispatch(sendResetLink(data))
                .then(action => {
                    setResponseMsg(action.payload.message);
                    if (action.payload.status === 200) {
                        setIsDisabled(true)
                        setResponseMsg(action.payload.data.message);
                    }
                    else {
                        setValidationError(true)
                        setResponseMsg(action.payload.data.message);
                    }
                })
        }catch(e: any){
            setResponseMsg(e.message)
        }
    }

    return(
        <Box className={"auth-container"}>
            <Typography
                variant="h3"
                component="h1"
                mb="10px"
            >
                Recover Account
            </Typography>

            <Box
                component={"form"}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                 sx={{
                    display: 'flex',
                    flexDirection: 'column'
            }}>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    }}
                    render={({ field }) =>
                        <TextField
                            id="form-email"
                            type="email"
                            size="small"
                            sx={{mt: '18px'}}
                            label="Email"
                            error={!!errors.email}
                            helperText={
                                errors.email?.type === "required" && "Email field cannot be empty" ||
                                errors.email?.type === "pattern" && "Invalid Email"
                            }
                            {...field}
                        />}
                />

                <Button variant="contained" sx={{mt: '15px'}} type="submit" disabled={isDisabled}>Send Reset Link</Button>

                <Box sx={{maxWidth: "250px", textAlign: "center", mt:'5px'}}>
                    <Typography
                        variant="body2"
                        component="p"
                        // color="error"
                    >
                        {responseMsg}
                    </Typography>
                </Box>

            </Box>
        </Box>
    )
}

export default ForgotPassword;
