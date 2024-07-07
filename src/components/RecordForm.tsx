const RecordForm = ({ inputData, onSubmit, children }: any) => {


  function handleSubmit(event: any) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data });
  }


  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="microsoftDetectionName">Title</label>
        <input
          type="text"
          id="microsoftDetectionName"
          name="microsoftDetectionName"
          defaultValue={inputData?.record?.microsoftDetectionName ?? ''}
        />
      </p>

      <p className="control">
        <label htmlFor="extensions">Extension</label>
        <input
          type="text"
          id="extensions"
          name="extensions"
          defaultValue={inputData?.record?.extensions ?? ''}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  )
};

export default RecordForm;
