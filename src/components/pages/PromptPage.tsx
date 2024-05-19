import { FC } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SearchService } from '@/services/Search.service';
import Spinner from '../common/Spinner';
import toast from 'react-hot-toast';
import { Download } from 'lucide-react';

interface PromptPageProps {}

const PromptPage: FC<PromptPageProps> = () => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    objUrl,
    register,
    videoUrl,
    isLoading,
  } = SearchService();

  return (
    <section className="flex-col gap-3 flex items-center">
      <h1 className="head-text mb-3">Prompt Here</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <Input
          autoFocus
          type="search"
          placeholder="Search"
          disabled={isLoading}
          {...register('prompt')}
        />

        <Button>{isLoading ? <Spinner /> : 'Search'}</Button>
      </form>
      <div className=" relative w-[500px] h-[400px] border-2 border-black flex items-center justify-center">
        {isLoading ? (
          <Spinner lg />
        ) : (
          <>
            <video
              src={videoUrl!}
              width={350}
              height={250}
              autoPlay
              loop
            ></video>
            {videoUrl !== null && (
              <Button className=" absolute bottom-2 right-2">
                <a href={objUrl!} className="flex" download>
                  <Download className="mr-2 h-4 w-4" /> Download
                </a>
              </Button>
            )}
          </>
        )}
      </div>

      {errors.prompt?.message && toast.error(errors.prompt.message)}
    </section>
  );
};

export default PromptPage;
