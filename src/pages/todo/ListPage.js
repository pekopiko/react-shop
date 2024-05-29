import ListComponent from "../../components/todo/ListComponent";

const ListPage = () => {
  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  List Page
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users in your account including their name,
                  title, email and role.
                </p>
              </div>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0">
              <ListComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPage;
