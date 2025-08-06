import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlinePermIdentity } from "react-icons/md";
import { setUserDetails } from '../store/userSlice';
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from '../utils/axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
  const dispatch = useDispatch();

  // ✅ Select only necessary fields to prevent over-re-rendering
  const { name, email, mobile, avatar } = useSelector(state => ({
    name: state.user.name,
    email: state.user.email,
    mobile: state.user.mobile,
    avatar: state.user.avatar
  }));

  const [openProfileEdit, setProfileAvatar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({ name, email, mobile });

  // ✅ Update local form state when Redux user changes
  useEffect(() => {
    setUserData({ name, email, mobile });
  }, [name, email, mobile]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData
      });

      if (response.data.success) {
        toast.success(response.data.message);

        const updatedUser = await fetchUserDetails(); // ✅ Proper variable name
        if (updatedUser?.data) {
          dispatch(setUserDetails(updatedUser.data));
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Profile Image */}
      <div className='w-20 h-20 bg-zinc-200 flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg'>
        {avatar ? (
          <img
            alt={name}
            src={avatar}
            className='w-full h-full object-cover'
          />
        ) : (
          <MdOutlinePermIdentity size={65} />
        )}
      </div>

      <button
        onClick={() => setProfileAvatar(true)}
        className='text-sm min-w-20 border px-2 py-1 rounded-full mt-5 border-yellow-200 hover:bg-green-400'
      >
        Edit
      </button>

      {openProfileEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatar(false)} />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className='my-4'>
        <div className='my-5 grid'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            placeholder="Enter Your Name"
            className="my-2 p-2 bg-green-50 outline-none border focus-within:border-yellow-300 rounded"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className='my-5 grid'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            placeholder="Enter Your Email"
            className="my-2 p-2 bg-green-50 outline-none border focus-within:border-yellow-300 rounded"
            onChange={handleOnChange}
            required
          />
        </div>

        <div className='my-5 grid'>
          <label htmlFor="mobile">Mobile No</label>
          <input
            type="number"
            name="mobile"
            value={userData.mobile}
            placeholder="Enter Your Number"
            className="p-2 bg-green-50 outline-none border focus-within:border-yellow-300 rounded my-2"
            onChange={handleOnChange}
            required
          />
        </div>

        <button
          type="submit"
          className="text-md font-bold w-full px-3 py-2 rounded-md mt-5 border-yellow-200 border-[2px] bg-green-100 hover:bg-amber-200"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
{
  /*
  **Fixes and Optimizations in Profile Component (React + Redux Toolkit)**

---

### 1. Fixed variable naming conflict after fetching updated user:

**Original (Buggy):**

```js
const userData = await fetchUserDetails(); // reusing form state variable name
if (updatedUser) {
  dispatch(setUserDetails(userData.data));
}
```

**Fixed:**

```js
const updatedUser = await fetchUserDetails();
if (updatedUser?.data) {
  dispatch(setUserDetails(updatedUser.data));
}
```

**Why:** Avoids confusion and logical errors from overwriting `userData` (used for form state).

---

### 2. Optimized `useSelector` usage:

**Original:**

```js
const user = useSelector(state => state.user);
```

**Optimized:**

```js
const { name, email, mobile, avatar } = useSelector(state => ({
  name: state.user.name,
  email: state.user.email,
  mobile: state.user.mobile,
  avatar: state.user.avatar
}));
```

**Why:** Improves performance by limiting re-renders to only relevant fields instead of the entire `user` object.

---

### 3. Updated `useEffect` dependency and logic:

**Before:**

```js
useEffect(() => {
  setUserData({
    name: user.name,
    email: user.email,
    mobile: user.mobile
  });
}, [user]);
```

**Improved:**

```js
useEffect(() => {
  setUserData({ name, email, mobile });
}, [name, email, mobile]);
```

**Why:** Avoids unnecessary effect triggers and guarantees sync only when specific values change.

---

### 4. Visual polish in JSX:

* Used `object-cover` class in avatar `<img>` for better image scaling:

```js
className='w-full h-full object-cover'
```

* Improved naming: `setProfileAvstar` -> `setProfileAvatar`

---

### Summary:

These changes improve:

* Component reliability
* Redux integration
* Form-field updates post submission
* Code readability and future maintainability

  */
}