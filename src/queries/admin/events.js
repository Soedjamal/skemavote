import { supabase } from "../../lib/supabase";

export default {
  async getTeachersNStaffByLevel(level, page = 1, limit = 50, { signal } = {}) {
    const offset = (page - 1) * limit;

    const { data, error } = await supabase
      .from("users")
      .select("id, name, level", {
        count: "exact",
        signal, // untuk abort controller
      })
      .eq("level", level)
      .range(offset, offset + limit - 1)
      .order("name", { ascending: true });

    if (error) return [];

    return data;
  },

  async insertEvent(data) {
    const result = await supabase.from("voting").insert(data);
    console.log(result);
    return result;
  },

  async updateEventById(data, id) {
    const result = await supabase.from("voting").update(data).eq("id", id);
    console.log(result);
    return result;
  },

  async getAllEvents() {
    const { data } = await supabase
      .from("voting")
      .select(
        "id, title, main_heading, sub_heading, description, banner, voting_start, voting_end, status",
        {
          count: "exact",
        },
      );
    // .order("", { ascending: true });
    return data;
  },

  async getEventById(id) {
    const { data } = await supabase
      .from("voting")
      .select(
        "id, title, main_heading, sub_heading, description, banner, voting_start, voting_end, status",
        {
          count: "exact",
        },
      )
      .eq("id", id)
      .single();
    // .order("", { ascending: true });
    return data;
  },

  async getActiveEvent() {
    const { data } = await supabase
      .from("voting")
      .select(
        "id, title, main_heading, sub_heading, description, banner, voting_start, voting_end, status",
        {
          count: "exact",
        },
      )
      .eq("status", true)
      .single();
    return data;
  },

  async getEventByIdAndDateTime(time, id) {
    const { data, error } = await supabase
      .from("voting")
      .select("voting_start, voting_end")
      .eq("id", id)
      .gt("voting_start", time)
      .order("voting_start", { ascending: true })
      .limit(1)
      .single();

    if (error) return null;
    return data;
  },

  async deleteEventById(id) {
    const { data, error } = await supabase.from("voting").delete().eq("id", id);

    if (error) {
      return [];
    }

    return data;
  },
};
