

"use client"; // Add this at the top
import Image from "next/image";
import { deletePropertyAPI } from "@/api/property";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = ({properties,setProperties}) => {
  // const [propertyList, setPropertyList] = useState([]);
      const router = useRouter();
    
      
      const deleteProperty = async (id) => {
          const isConfirmed = window.confirm("Are you sure you want to delete this property?");
          if (!isConfirmed) return;
      
          try {
            const data = await deletePropertyAPI(id); // 🔹 Call the API function
            toast.success(data.message);
            // alert(data.message);
            setProperties((properties) => properties.filter((property) => property._id !== id));
            //setTitle(""); // ✅ Reset input after success
            
            return false
          } catch (error) {
            alert("Failed to delete Property.");
            //setError(error.message); // ❌ Show error if request fails
          }
        };
  let theadConent = [
    "Listing Title",
    "Date published",
    "Status",
    // "View",
    "Action",
  ];
  let tbodyContent = properties?.map((item, index) => (
    <tr key={item._id}>
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          <div className="thumb">
          <Image
              width={150}
              height={220}
              className="img-whp cover"
              src={
                item.featuredimageurl
                 ? `${process.env.NEXT_PUBLIC_API_URL}${item.featuredimageurl.url?item.featuredimageurl.url:item.featuredimageurl}`
                  : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
              }
              alt= {`${item.featuredimageurl?.name?item.featuredimageurl?.name:item.title}`}
              unoptimized // Optional: disables Next.js image optimization (useful if external images)
            />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">{item.categoryid.title}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="details">
            <div className="tc_content">
              <h4>{item.title}</h4>
              <p>
                <span className="flaticon-placeholder"></span>
                 {item.address}, {item.locationid?.title}, {item.cityid?.title}
              </p>
              <a className="fp_price text-thm" href="#">
                ${item.price}
                {/* <small>/mo</small> */}
              </a>
            </div>
          </div>
        </div>
      </td>
      {/* End td */}

      <td>{new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })}</td>
      {/* End td */}

      <td>
      
      <span className={`status_tag ${item.status ? 'badge2' : 'badge'}`}>{item.status ? "Active" : "Deactive"}</span>

    </td>
      {/* End td */}

      {/* <td>2,345</td> */}
      {/* End td */}

      <td>
        <ul className="view_edit_delete_list mb0">
        <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <button  onClick={() => router.push(`/cmswegrow/edit-property/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          {/* End li */}

          <li className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <a href="#"  onClick={() => deleteProperty(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));
  // useEffect(() => {
  //   fetchPropertyData();
  // }, []);
  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End theaad */}

        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
