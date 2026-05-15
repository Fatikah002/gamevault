export default function Spinner() {
      return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="h-14 w-14 animate-spin rounded-full 
        border-4 border-slate-700 border-t-violet-500"
        ></div>
      </div>
    );
  }