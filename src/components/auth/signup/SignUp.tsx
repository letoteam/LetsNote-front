import React, {FC} from "react";

import FormLayout from "../FormLayout";
import SignUpForm from "./SignUpForm";

interface Props {}



const SignUp : FC = (props: Props) => {

    return(
        <FormLayout userHasAccount={false}>
            <SignUpForm/>
        </FormLayout>
    )

}

export default SignUp;