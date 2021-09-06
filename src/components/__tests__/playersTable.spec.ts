import PlayersTable from "@/components/PlayersTable.vue";
import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { Player } from "@/store/modules/players/players.types";

describe("PlayersTable", () => {
  describe("snapshots", () => {
    it("should render proper snapshot when players prop is empty", () => {
      const wrapper = shallowMount(PlayersTable, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
      });
      wrapper.setProps({ players: [] });

      expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it("should render proper snapshot when players prop is not empty", () => {
      const wrapper = shallowMount(PlayersTable, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub,
          },
        },
        props: {
          players: [
            {
              id: 2,
              firstName: "Michael",
              lastName: "Jordan",
              height: `7'3"`,
              weight: "200 lbs",
              position: "F",
              teamName: "Chicago Bulls",
            },
            {
              id: 3,
              firstName: "Marcin",
              lastName: "Gortat",
              height: `8'5"`,
              weight: "235 lbs",
              position: "C",
              teamName: "New York Knicks",
            },
          ] as Player[],
        },
      });

      expect(wrapper.vm.$el).toMatchSnapshot();
    });
  });
});
