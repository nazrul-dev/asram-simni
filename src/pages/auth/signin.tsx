'use client'
import {
  Button,
  Input,
  Checkbox,
  Link,
  Card,
  CardBody,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Divider,
} from "@nextui-org/react";
import { EyeOff, Eye, ArrowLeft } from "lucide-react";
import { getCsrfToken, signIn, useSession } from "next-auth/react";


import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import GuestLayout from "@/layouts/GuestLayout";




const SignUpSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

const ForgetSchema = z.object({
  email: z.string().trim().email(),

});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;
type ForgetSchemaType = z.infer<typeof ForgetSchema>;

const SignInPage = () => {

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');


  const [processing, setProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [force, setForce] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema), defaultValues: {
      email: 'admindesa@demo.com',
      password: 'Pas5word'

    },
  });

  const {
    register: registerForget,
    handleSubmit: handleSubmitForget,
    formState: { errors: errorsForget },
  } = useForm<ForgetSchemaType>({ resolver: zodResolver(ForgetSchema) });


  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    setProcessing(true);
    setForce(true);

    console.log(data)
    try {
      const res: any = await signIn("credentials", {

        redirect: false,
        ...data,
        "type": "USER_DESA"
      });

      console.log(callbackUrl)

      if (res.error) {
        if (res.error.trim() !== "") {
          const resError = JSON.parse(res.error);
          toast.error(resError?.message);
        } else {
          toast.error('error');
        }

        return;
      }

      window.location.href = callbackUrl ?? '/dashboard'



    } catch (e) {
      toast.error('eee');

    } finally {
      setProcessing(false);
    }
  };

  const onSend: SubmitHandler<ForgetSchemaType> = async (data) => {
    setProcessing(true);
    // try {
    //     const response: any = await axiosInstance.post(COSTUMER.REQUEST_FORGOT_PASSWORD, data);

    //     if (response?.data?.success) {
    //         toast.success(response?.data?.message);

    //     } else {
    //         toast.error(response?.data?.message ?? "Please Try Again");
    //     }
    // } catch (e) {
    //     toast.error("Error Server");

    // } finally {
    //     setProcessing(false);
    // }
  };


  // if (status && status === "loading") {
  //     return <div className="inset-0 h-96 flex flex-col items-center justify-center"><Spinner /></div>
  // }

  // if (status && status === "authenticated" && !force) {
  //     setTimeout(() => {

  //     }, 1000)
  //     return <div className="inset-0 h-96 flex flex-col items-center justify-center"><Spinner /></div>
  // }


  return (
    <div className="relative  mt-20">
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmitForget(onSend)}>
                <ModalBody>
                  <h1 className="text-xl font-bold mt-5">Forget Password</h1>
                  <div className="font-semibold -mt-3">
                    Enter your email for a reset password link
                  </div>
                  <Input

                    autoComplete="email"
                    labelPlacement={"inside"}
                    placeholder="Enter your email"
                    type="email"
                    label="Email"
                    {...registerForget("email")}
                    isInvalid={errorsForget?.email ? true : false}
                    errorMessage={errorsForget?.email?.message}
                  />
                </ModalBody>
                <ModalFooter>

                  <Button isLoading={processing}
                    isDisabled={processing} color="primary" type="submit">
                    Send password link
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className=" pt-5 md:pt-16">

        <Card isBlurred>
          <CardBody>
            <div>
              <h1 className="text-xl font-bold"> Login Page</h1>
              <div className="text-gray-400 mb-4 md:text-base text-sm">
                Sportirena
                <Link className="font-semibold md:text-base text-sm ml-1" href="/auth/signup">
                  Admin Panel
                </Link>
              </div>
              <Divider />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-3 pt-5">
                  <div>
                    <Input
                      autoComplete="email"
                      labelPlacement={"outside"}

                      type="email"
                      label='Email'

                      {...register("email")}
                      isInvalid={errors?.email ? true : false}
                      errorMessage={errors?.email?.message}
                    />
                  </div>

                  <div>
                    <Input

                      labelPlacement={"outside"}

                      type={isVisible ? "text" : "password"}
                      label='Password'
                      {...register("password")}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      }
                      autoComplete="current-password"
                      isInvalid={errors?.password ? true : false}
                      errorMessage={errors?.password?.message}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button color="primary" size="sm" variant="flat" onClick={onOpen} className=" text-sm ">
                      Forget Password
                    </Button>
                  </div>
                </div>
                <div className="flex  justify-between items-center mt-5">
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={processing}
                    isDisabled={processing}
                    color="primary"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>

      </div>

    </div>
  );
}


SignInPage.getLayout = (page: any) => <GuestLayout>{page}</GuestLayout>
export default SignInPage