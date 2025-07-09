const ActionBar = ({ filterTitle = "Filter", onClick, actions, filterAct }) => {
  return (
    <>
      <div className="overflow-x-auto md:overflow-visible w-full pb-2">
        <div className="flex justify-between items-center w-full gap-4 flex-shrink-0">
          {filterAct}

          <div className="flex gap-4 items-center">
            {actions?.map((item) => (
              <>{item}</>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
