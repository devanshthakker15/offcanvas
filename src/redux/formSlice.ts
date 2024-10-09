import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { RootState } from './store';

// Define the shape of form data
interface FormData {
  categoryName: string;
  categoryCode: string;
  categoryDescription: string;
  price: number;
}

interface FormState {
  modalFormData: FormData[];
  offcanvasFormData: FormData[];
  editIndex: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: FormState = {
  modalFormData: [],
  offcanvasFormData: [],
  editIndex: null,
  status: 'idle',
};

// Thunks for async actions
export const fetchFormData = createAsyncThunk(
  'form/fetchFormData',
  async () => {
    const modalData = localStorage.getItem('modalFormData');
    const offcanvasData = localStorage.getItem('offcanvasFormData');
    return {
      modalFormData: modalData ? JSON.parse(modalData) : [],
      offcanvasFormData: offcanvasData ? JSON.parse(offcanvasData) : [],
    };
  }
);

export const saveModalFormData = createAsyncThunk(
  'form/saveModalFormData',
  async (formData: FormData[], { getState }) => {
    localStorage.setItem('modalFormData', JSON.stringify(formData));
    return formData;
  }
);

export const saveOffcanvasFormData = createAsyncThunk(
  'form/saveOffcanvasFormData',
  async (formData: FormData[], { getState }) => {
    localStorage.setItem('offcanvasFormData', JSON.stringify(formData));
    return formData;
  }
);

// Slice definition
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setEditIndex: (state, action) => {
      state.editIndex = action.payload;
    },
    clearEditIndex: (state) => {
      state.editIndex = null;
    },
    addModalFormData: (state, action) => {
      if (state.editIndex !== null) {
        state.modalFormData[state.editIndex] = action.payload;
        state.editIndex = null;
      } else {
        state.modalFormData.push(action.payload);
      }
    },
    addOffcanvasFormData: (state, action) => {
      if (state.editIndex !== null) {
        state.offcanvasFormData[state.editIndex] = action.payload;
        state.editIndex = null;
      } else {
        state.offcanvasFormData.push(action.payload);
      }
    },
    deleteModalFormData: (state, action) => {
      state.modalFormData.splice(action.payload, 1);
    },
    deleteOffcanvasFormData: (state, action) => {
      state.offcanvasFormData.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormData.fulfilled, (state, action) => {
        state.modalFormData = action.payload.modalFormData;
        state.offcanvasFormData = action.payload.offcanvasFormData;
      })
      .addCase(saveModalFormData.fulfilled, (state, action) => {
        state.modalFormData = action.payload;
      })
      .addCase(saveOffcanvasFormData.fulfilled, (state, action) => {
        state.offcanvasFormData = action.payload;
      });
  },
});

export const {
  setEditIndex,
  clearEditIndex,
  addModalFormData,
  addOffcanvasFormData,
  deleteModalFormData,
  deleteOffcanvasFormData,
} = formSlice.actions;

export default formSlice.reducer;
