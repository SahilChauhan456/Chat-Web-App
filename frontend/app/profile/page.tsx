"use client";
import React, { useEffect, useState } from "react";
import { useAppData, user_service } from "../context/AppContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const ProfilePage = () => {
  const { user, isAuth, loading, setUser } = useAppData();

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState<string | undefined>("");

  const router = useRouter();

  const editHandler = () => {
    setIsEdit(!isEdit);
    setName(user?.name);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const token = Cookies.get("token");

    try {
      const { data } = await axios.post(
        `${user_service}/api/v1/update/name`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Cookies.set("token", data.token, {
        expires: 15,
        secure: false,
        path: "/",
      });

      toast.success(data.message);
      setUser(data.user);
      setIsEdit(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!isAuth && !loading) {
      router.push("/login");
    }
  }, [isAuth, router, loading]);

  if(loading) return <Loading />;

  return <div className="">ProfilePage</div>;
};

export default ProfilePage;
