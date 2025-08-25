# 🚀 Update All Listing Components - Complete Guide

## 📋 Components Already Updated ✅

1. ✅ `my-color` - Fully functional search & pagination
2. ✅ `my-aisoftwarefeature` - Fully functional search & pagination  
3. ✅ `my-country` - Fully functional search & pagination
4. ✅ `my-robot` - Fully functional search & pagination
5. ✅ `my-manufacturer` - Fully functional search & pagination

## 🔄 Components Still Need Update ❌

### **High Priority (Most Used)**
1. ❌ `my-blog` - Blog listings
2. ❌ `my-category` - Category listings
3. ❌ `my-blogcategory` - Blog category listings
4. ❌ `my-review` - Review listings
5. ❌ `my-faq` - FAQ listings

### **Medium Priority**
6. ❌ `my-autonomylevel` - Autonomy level listings
7. ❌ `my-communicationmethod` - Communication method listings
8. ❌ `my-material` - Material listings
9. ❌ `my-navigationtype` - Navigation type listings
10. ❌ `my-operatingenvironment` - Operating environment listings

### **Low Priority**
11. ❌ `my-payloadtype` - Payload type listings
12. ❌ `my-powersource` - Power source listings
13. ❌ `my-primaryfunction` - Primary function listings
14. ❌ `my-sensor` - Sensor listings
15. ❌ `my-terraincapability` - Terrain capability listings

## 🛠️ Quick Update Pattern

### **Step 1: Update Main Component (index.jsx)**

```jsx
"use client";

import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "../../common/SearchBox";
import CopyRight from "../../common/footer/CopyRight";
import { useSearchAndPagination } from "../../../hooks/useSearchAndPagination";
import { getYourDataAPI } from "../../../api/yourdata";

const index = () => {
  // Use the custom hook for search and pagination
  const {
    currentData: currentItems,
    loading,
    error,
    searchQuery,
    handleSearch,
    currentPage,
    totalPages,
    handlePageChange,
    refreshData: handleRefresh,
    searchInfo
  } = useSearchAndPagination(getYourDataAPI, 10, ['name', 'status', 'description']);

  return (
    <>
      <Header />
      <MobileMenu />
      
      <div className="dashboard_sidebar_menu">
        <div className="offcanvas offcanvas-dashboard offcanvas-start" tabIndex="-1" id="DashboardOffcanvasMenu" data-bs-scroll="true">
          <SidebarMenu />
        </div>
      </div>

      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                
                {/* Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button className="dropbtn" data-bs-toggle="offcanvas" data-bs-target="#DashboardOffcanvasMenu" aria-controls="DashboardOffcanvasMenu">
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>

                {/* Breadcrumb */}
                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">Your Item List</h2>
                    <p>View, search, and manage your items.</p>
                    {searchInfo.hasSearchQuery && (
                      <small className="text-muted">
                        Showing {searchInfo.totalResults} of {searchInfo.totalItems} results
                        {searchQuery && ` for "${searchQuery}"`}
                      </small>
                    )}
                  </div>
                </div>

                {/* Search & Filter */}
                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          <SearchBox 
                            onSearch={handleSearch} 
                            placeholder="Search items..." 
                          />
                        </div>
                      </li>
                      <li className="list-inline-item">
                        <Filtering />
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Table & Pagination */}
                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <TableData 
                          items={currentItems}
                          loading={loading}
                          error={error}
                          onRefresh={handleRefresh}
                        />
                      </div>

                      {!loading && !error && searchInfo.totalResults > 0 && (
                        <div className="mbp_pagination">
                          <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            totalItems={searchInfo.totalResults}
                            itemsPerPage={searchInfo.itemsPerPage}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <CopyRight/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
```

### **Step 2: Update TableData Component**

```jsx
"use client";
import { deleteYourItemAPI } from "../../../api/yourdata";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = ({ items = [], loading = false, error = null, onRefresh }) => {
  const router = useRouter();

  const deleteItem = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) return;

    try {
      const data = await deleteYourItemAPI(id);
      toast.success(data.message);
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      toast.error("Failed to delete item.");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading items...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
        <button className="btn btn-primary mt-3" onClick={onRefresh}>
          <i className="fas fa-redo me-2"></i>
          Try Again
        </button>
      </div>
    );
  }

  // Show empty state
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-info" role="alert">
          <i className="fas fa-info-circle me-2"></i>
          No items found.
        </div>
      </div>
    );
  }

  let theadContent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = items.map((item) => (
    <tr key={item._id || Math.random()}>
      <td scope="row" className="align-middle text-center">
        <h4 className="mb-0">{item?.name || 'N/A'}</h4>
      </td>
      <td className="align-middle text-center">
        {item?.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }) : 'N/A'}
      </td>
      <td className="align-middle text-center">
        <span className={`status_tag ${item?.status ? 'badge2' : 'badge'}`}>
          {item?.status ? "Active" : "Deactive"}
        </span>
      </td>
      <td className="align-middle text-center">
        <ul className="view_edit_delete_list mb0 d-flex justify-content-center">
          <li className="list-inline-item" title="Edit">
            <button onClick={() => router.push(`/cmsroboticlife/edit-item/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteItem(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadContent.map((value, i) => (
              <th scope="col" key={i} className="text-center">
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
```

### **Step 3: Update Pagination Component**

```jsx
"use client";
import { useCallback } from 'react';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange, 
  totalItems = 0, 
  itemsPerPage = 10 
}) => {
  
  const handlePageClick = useCallback((page) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  }, [onPageChange, totalPages]);

  if (totalPages <= 1 || totalItems === 0) {
    return null;
  }

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <ul className="page_navigation">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
          <span className="flaticon-left-arrow"></span>
        </button>
      </li>

      {visiblePages.map((page, index) => (
        <li key={index} className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}>
          {page === '...' ? (
            <span className="page-link">{page}</span>
          ) : (
            <button className="page-link" onClick={() => handlePageClick(page)}>
              {page}
              {page === currentPage && <span className="sr-only">(current)</span>}
            </button>
          )}
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
          <span className="flaticon-right-arrow"></span>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
```

## 🚀 Quick Update Commands

### **For Each Component, Run These Commands:**

```bash
# 1. Update main component
cp admin/components/dashboard/my-color/index.jsx admin/components/dashboard/my-YOURCOMPONENT/index.jsx

# 2. Update TableData component  
cp admin/components/dashboard/my-color/TableData.jsx admin/components/dashboard/my-YOURCOMPONENT/TableData.jsx

# 3. Update Pagination component
cp admin/components/dashboard/my-color/Pagination.jsx admin/components/dashboard/my-YOURCOMPONENT/Pagination.jsx
```

### **Then Edit Each File:**
- Change component names
- Update API imports
- Update search fields
- Update table headers
- Update routing paths

## 🎯 Priority Order

1. **First**: `my-blog`, `my-category` (most used)
2. **Second**: `my-review`, `my-faq` (medium usage)
3. **Third**: All remaining components

## ⚠️ Important Notes

- **Keep exact same design** - only change functionality
- **Test each component** after updating
- **Check browser console** for any errors
- **Verify search works** in real-time
- **Verify pagination** shows correct page numbers

## 🎉 Expected Result

After updating all components, you'll have:
- ✅ **Fully functional search** across ALL listing pages
- ✅ **Dynamic pagination** based on actual data
- ✅ **Consistent user experience** throughout admin panel
- ✅ **Professional loading states** and error handling
- ✅ **Same beautiful design** with enhanced functionality

---

**🚀 Your entire admin panel will have enterprise-grade search and pagination!**
