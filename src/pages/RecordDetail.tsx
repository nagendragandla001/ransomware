import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchRecord, updateEvent } from "../utils/http";
import Details from "../components/Details";
import RecordForm from "../components/RecordForm";

const RecordDetailPage = () => {

  const params = useParams();
  const navigate = useNavigate();

  if (!params.id) {
    throw new Error("Page not found");
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchRecord({ id: params.id as string, signal })
  });

  const { mutate } = useMutation({
    mutationKey: [],
    mutationFn: updateEvent,
  });

  const onSubmitHandler = (formData: any) => {
    mutate({ id: params.id, event: formData });
    navigate("../");
  }

  let content;


  if (isPending) {
    content = <h2>Loading</h2>;
  }

  if (isError) {
    content = <h2>Error</h2>
  }

  if (data) {
    content = <p>{JSON.stringify(data)}</p>
  }

  return (
    <div>
      <Details id={params.id}>
        <RecordForm inputData={data} onSubmit={onSubmitHandler}>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </RecordForm>
      </Details>

    </div>

  )
};

export default RecordDetailPage;