import { supabase } from "../../lib/supabase";

export default {
  async getAbsoluteAllUsersByLevel(level) {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, level, token, nisn, jurusan", {
        count: "exact",
      })
      .eq("level", level);
    if (error) return [];
    return data;
  },

  async getUsersByLevel(level, page = 1, limit = 50, { signal } = {}) {
    const offset = (page - 1) * limit;

    const { data, error } = await supabase
      .from("users")
      .select("id, name, level, token, nisn, jurusan", {
        count: "exact",
        signal, // untuk abort controller
      })
      .eq("level", level)
      .range(offset, offset + limit - 1);

    if (error) return [];

    return data;
  },

  async getStudentsByLevel(level, page = 1, limit = 50, { signal } = {}) {
    const offset = (page - 1) * limit;

    const { data, error } = await supabase
      .from("users")
      .select("id, name, nisn, jurusan, has_voted", {
        count: "exact",
        signal, // untuk abort controller
      })
      .eq("level", level)
      .range(offset, offset + limit - 1);

    if (error) return [];

    return data;
  },

  async getTeachersNStaffByLevel(level, page = 1, limit = 50, { signal } = {}) {
    const offset = (page - 1) * limit;

    const { data, error } = await supabase
      .from("users")
      .select("id, name, level, token", {
        count: "exact",
        signal, // untuk abort controller
      })
      .eq("level", level)
      .range(offset, offset + limit - 1)
      .order("name", { ascending: true });

    if (error) return [];

    return data;
  },

  async getUserByToken(token) {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, nisn, token, has_voted")
      .eq("token", token)
      .single();

    console.log(data, error);

    if (error) return [];
    return data;
  },

  async deleteAllUsersByLevel(level) {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("level", level);

    if (error) {
      return [];
    }

    return data;
  },

  async deleteUserById(id) {
    const { data, error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      return [];
    }

    return data;
  },

  async insertUsersTokenByLevel(level) {
    const { data, error } = await supabase.rpc("generate_tokens_by_level", {
      lvl: level,
    });

    if (error) {
      return [];
    }

    return data;
  },

  async insertCandidate(data) {
    const result = await supabase.from("candidates").insert(data);
    console.log(result);
    return result;
  },

  async getAllCandidates() {
    const { data } = await supabase
      .from("candidates")
      .select(
        "id, paslon, nama_ketua, nama_wakil, thumbnail_url, total_vote, level",

        {
          count: "exact",
        },
      )
      .order("paslon", { ascending: true });
    return data;
  },

  async deleteCandidateById(id) {
    const { data, error } = await supabase
      .from("candidates")
      .delete()
      .eq("id", id);

    if (error) {
      return [];
    }

    return data;
  },
};
