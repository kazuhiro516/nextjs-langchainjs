import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("GitHubとの連携に失敗しました。");
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("Googleとの連携に失敗しました。");
      }
    }
  };

  const signUpEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("失敗しました。");
      }
    }
  };

  const signInEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("失敗しました。");
      }
    }
  };

  const profileFromGithub: {
    nickName: string;
    avatarUrl: string;
  } = {
    nickName: session?.user?.user_metadata.user_name,
    avatarUrl: session?.user?.user_metadata.avatar_url,
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message);
    }
  };

  return {
    error,
    session,
    profileFromGithub,
    signInEmail,
    signInWithGithub,
    signInWithGoogle,
    signOut,
    signUpEmail,
  };
}
